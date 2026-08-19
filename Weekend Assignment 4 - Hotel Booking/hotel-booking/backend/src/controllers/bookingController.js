import { Booking, Room, Hotel, User } from "../models/index.js";
import { parseDateRange, getAvailableUnits, getBookedCountForNight } from "../utils/availability.js";
import { computeStayPrice } from "../utils/pricing.js";
import { computeRefund } from "../utils/cancellation.js";
import { sendMail, bookingConfirmationEmail, bookingCancellationEmail } from "../utils/email.js";

export async function createBooking(request, reply) {
  const { roomId, checkIn, checkOut, guestCount } = request.body || {};

  if (!roomId || !checkIn || !checkOut) {
    return reply.code(400).send({ error: "Bad Request", message: "roomId, checkIn and checkOut are required" });
  }

  const range = parseDateRange(checkIn, checkOut);
  if (range.error) return reply.code(400).send({ error: "Bad Request", message: range.error });

  const guests = guestCount ? Number(guestCount) : 1;
  if (!Number.isInteger(guests) || guests < 1) {
    return reply.code(400).send({ error: "Bad Request", message: "guestCount must be a positive integer" });
  }

  const room = await Room.findByPk(roomId, { include: [{ model: Hotel, as: "hotel" }] });
  if (!room) return reply.code(404).send({ error: "Not Found", message: "Room not found" });

  if (guests > room.capacity) {
    return reply
      .code(400)
      .send({ error: "Bad Request", message: `This room type sleeps up to ${room.capacity} guests` });
  }

  try {
    const availableUnits = await getAvailableUnits(room, range.checkIn, range.checkOut);
    if (availableUnits < 1) {
      const err = new Error("No rooms of this type are available for the selected dates");
      err.statusCode = 409;
      throw err;
    }

    const quote = await computeStayPrice(
      room.basePrice,
      range.checkIn,
      range.checkOut,
      room.quantity,
      (night) => getBookedCountForNight(room.id, night)
    );

    const booking = await Booking.create({
      roomId: room.id,
      guestId: request.user.id,
      checkIn,
      checkOut,
      guestCount: guests,
      totalPrice: quote.total,
      status: "confirmed",
    });

    const guest = await User.findByPk(request.user.id);
    const { subject, html, text } = bookingConfirmationEmail(booking, room, room.hotel, guest);
    sendMail({ to: guest.email, subject, html, text }).catch(() => {});

    return reply.code(201).send({ booking });
  } catch (err) {
    const status = err.statusCode || 500;
    if (status >= 500) request.log.error(err);
    return reply.code(status).send({ error: status === 409 ? "Conflict" : "Server Error", message: err.message });
  }
}

export async function myBookings(request, reply) {
  const bookings = await Booking.findAll({
    where: { guestId: request.user.id },
    include: [{ model: Room, as: "room", include: [{ model: Hotel, as: "hotel" }] }],
    order: [["checkIn", "DESC"]],
  });

  const todayStr = new Date().toISOString().slice(0, 10);
  const upcoming = bookings.filter((b) => b.checkOut >= todayStr && b.status === "confirmed");
  const past = bookings.filter((b) => b.checkOut < todayStr || b.status === "cancelled");

  return reply.send({ upcoming, past });
}

export async function cancelBooking(request, reply) {
  const booking = await Booking.findByPk(request.params.id, {
    include: [{ model: Room, as: "room", include: [{ model: Hotel, as: "hotel" }] }],
  });
  if (!booking) return reply.code(404).send({ error: "Not Found", message: "Booking not found" });

  const isOwningGuest = request.user.role === "guest" && booking.guestId === request.user.id;
  const isOwningAdmin = request.user.role === "hotel_admin" && booking.room.hotel.ownerId === request.user.id;
  if (!isOwningGuest && !isOwningAdmin) {
    return reply.code(403).send({ error: "Forbidden", message: "You cannot cancel this booking" });
  }

  if (booking.status === "cancelled") {
    return reply.code(409).send({ error: "Conflict", message: "Booking is already cancelled" });
  }

  const checkInDate = new Date(`${booking.checkIn}T00:00:00.000Z`);
  const refund = computeRefund(checkInDate, booking.totalPrice);

  await booking.update({
    status: "cancelled",
    cancelledAt: new Date(),
    refundAmount: refund.amount,
    refundPercent: refund.percent,
  });

  const guest = await User.findByPk(booking.guestId);
  const { subject, html, text } = bookingCancellationEmail(booking, booking.room, booking.room.hotel, guest, refund);
  sendMail({ to: guest.email, subject, html, text }).catch(() => {});

  return reply.send({ booking, refund });
}
