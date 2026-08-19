import { Op } from "sequelize";
import { Hotel, Room, Booking, User } from "../models/index.js";
import { parseDateRange, getBookedCountForNight } from "../utils/availability.js";

async function assertOwnsHotel(hotelId, userId) {
  const hotel = await Hotel.findByPk(hotelId, { include: [{ model: Room, as: "rooms" }] });
  if (!hotel) return { error: { code: 404, body: { error: "Not Found", message: "Hotel not found" } } };
  if (hotel.ownerId !== userId) {
    return { error: { code: 403, body: { error: "Forbidden", message: "You do not own this hotel" } } };
  }
  return { hotel };
}

export async function getOccupancyReport(request, reply) {
  const { hotelId, startDate, endDate } = request.query || {};
  if (!hotelId) return reply.code(400).send({ error: "Bad Request", message: "hotelId is required" });

  const { hotel, error } = await assertOwnsHotel(hotelId, request.user.id);
  if (error) return reply.code(error.code).send(error.body);

  const range = parseDateRange(
    startDate || new Date().toISOString().slice(0, 10),
    endDate || new Date(Date.now() + 7 * 86400000).toISOString().slice(0, 10)
  );
  if (range.error) return reply.code(400).send({ error: "Bad Request", message: range.error });

  const totalRooms = hotel.rooms.reduce((sum, r) => sum + r.quantity, 0);
  const days = [];
  const cursor = new Date(range.checkIn);
  while (cursor < range.checkOut) {
    const dateStr = cursor.toISOString().slice(0, 10);
    const byRoomType = [];
    let bookedTotal = 0;
    for (const room of hotel.rooms) {
      const booked = await getBookedCountForNight(room.id, new Date(cursor));
      bookedTotal += booked;
      byRoomType.push({
        roomId: room.id,
        roomType: room.type,
        booked,
        total: room.quantity,
        occupancyRate: room.quantity ? Math.round((booked / room.quantity) * 1000) / 10 : 0,
      });
    }
    days.push({
      date: dateStr,
      bookedTotal,
      totalRooms,
      occupancyRate: totalRooms ? Math.round((bookedTotal / totalRooms) * 1000) / 10 : 0,
      byRoomType,
    });
    cursor.setUTCDate(cursor.getUTCDate() + 1);
  }

  return reply.send({ hotelId: hotel.id, hotelName: hotel.name, totalRooms, days });
}

// GET /api/admin/bookings?hotelId=&status=
// Lets an admin see (and act on) every booking made against their
// property — previously the only way to find a guest's booking was to
// ask the guest for the ID.
export async function getHotelBookings(request, reply) {
  const { hotelId, status } = request.query || {};
  if (!hotelId) return reply.code(400).send({ error: "Bad Request", message: "hotelId is required" });

  const { error } = await assertOwnsHotel(hotelId, request.user.id);
  if (error) return reply.code(error.code).send(error.body);

  const roomWhere = { hotelId };
  const bookingWhere = {};
  if (status === "confirmed" || status === "cancelled") bookingWhere.status = status;

  const bookings = await Booking.findAll({
    where: bookingWhere,
    include: [
      { model: Room, as: "room", where: roomWhere, include: [{ model: Hotel, as: "hotel" }] },
      { model: User, as: "guest", attributes: ["id", "name", "email"] },
    ],
    order: [["checkIn", "DESC"]],
  });

  return reply.send({ bookings });
}

export async function getDashboardSummary(request, reply) {
  const hotels = await Hotel.findAll({ where: { ownerId: request.user.id }, include: [{ model: Room, as: "rooms" }] });
  const hotelIds = hotels.map((h) => h.id);
  const roomIds = hotels.flatMap((h) => h.rooms.map((r) => r.id));

  if (roomIds.length === 0) {
    return reply.send({
      totalHotels: hotels.length,
      activeHotels: hotels.filter((h) => h.isActive).length,
      totalRoomTypes: 0,
      totalBookings: 0,
      upcomingCheckIns: 0,
      totalRevenue: 0,
    });
  }

  const todayStr = new Date().toISOString().slice(0, 10);

  const allBookings = await Booking.findAll({
    where: { roomId: { [Op.in]: roomIds } },
    attributes: ["id", "status", "checkIn", "totalPrice"],
  });

  const confirmed = allBookings.filter((b) => b.status === "confirmed");
  const totalRevenue = confirmed.reduce((sum, b) => sum + b.totalPrice, 0);
  const upcomingCheckIns = confirmed.filter((b) => b.checkIn >= todayStr).length;

  return reply.send({
    totalHotels: hotels.length,
    activeHotels: hotels.filter((h) => h.isActive).length,
    totalRoomTypes: roomIds.length,
    totalBookings: allBookings.length,
    upcomingCheckIns,
    totalRevenue: Math.round(totalRevenue * 100) / 100,
  });
}
