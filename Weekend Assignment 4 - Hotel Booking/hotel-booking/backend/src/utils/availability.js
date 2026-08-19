import { Op } from "sequelize";
import { Booking } from "../models/index.js";

export async function getOverlappingBookings(roomId, checkIn, checkOut, { excludeBookingId, transaction } = {}) {
  const where = {
    roomId,
    status: "confirmed",
    checkIn: { [Op.lt]: checkOut },
    checkOut: { [Op.gt]: checkIn },
  };
  if (excludeBookingId) {
    where.id = { [Op.ne]: excludeBookingId };
  }
  return Booking.findAll({ where, transaction });
}

export async function getBookedCountForNight(roomId, nightDate, { transaction } = {}) {
  const nightStr = nightDate.toISOString().slice(0, 10);
  const bookings = await Booking.findAll({
    where: {
      roomId,
      status: "confirmed",
      checkIn: { [Op.lte]: nightStr },
      checkOut: { [Op.gt]: nightStr },
    },
    transaction,
  });
  return bookings.length;
}

export async function getAvailableUnits(room, checkIn, checkOut, { transaction } = {}) {
  const overlapping = await getOverlappingBookings(room.id, checkIn, checkOut, { transaction });

  const nightlyCounts = new Map();
  const cursor = new Date(checkIn);
  while (cursor < checkOut) {
    nightlyCounts.set(cursor.toISOString().slice(0, 10), 0);
    cursor.setUTCDate(cursor.getUTCDate() + 1);
  }

  for (const booking of overlapping) {
    const bCursor = new Date(Math.max(new Date(booking.checkIn), checkIn));
    const bEnd = new Date(Math.min(new Date(booking.checkOut), checkOut));
    while (bCursor < bEnd) {
      const key = bCursor.toISOString().slice(0, 10);
      if (nightlyCounts.has(key)) nightlyCounts.set(key, nightlyCounts.get(key) + 1);
      bCursor.setUTCDate(bCursor.getUTCDate() + 1);
    }
  }

  const maxBooked = nightlyCounts.size ? Math.max(...nightlyCounts.values()) : 0;
  return Math.max(0, room.quantity - maxBooked);
}

export function parseDateRange(checkInRaw, checkOutRaw) {
  if (!checkInRaw || !checkOutRaw) {
    return { error: "checkIn and checkOut are required (YYYY-MM-DD)" };
  }
  const checkIn = new Date(`${checkInRaw}T00:00:00.000Z`);
  const checkOut = new Date(`${checkOutRaw}T00:00:00.000Z`);

  if (Number.isNaN(checkIn.getTime()) || Number.isNaN(checkOut.getTime())) {
    return { error: "checkIn and checkOut must be valid dates (YYYY-MM-DD)" };
  }
  if (checkOut <= checkIn) {
    return { error: "checkOut must be after checkIn" };
  }
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);
  if (checkIn < today) {
    return { error: "checkIn cannot be in the past" };
  }
  const maxStayNights = 90;
  const nights = Math.round((checkOut - checkIn) / (1000 * 60 * 60 * 24));
  if (nights > maxStayNights) {
    return { error: `Stay length cannot exceed ${maxStayNights} nights` };
  }

  return { checkIn, checkOut, nights };
}
