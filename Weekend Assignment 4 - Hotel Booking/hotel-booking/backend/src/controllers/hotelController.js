import { Op } from "sequelize";
import { Hotel, Room, Booking } from "../models/index.js";
import { parseDateRange, getAvailableUnits } from "../utils/availability.js";

export async function listHotels(request, reply) {
  const { city, checkIn, checkOut, guests } = request.query || {};

  const where = { isActive: true };
  if (city && city.trim()) {
    const search = city.trim();
    where[Op.or] = [
      { city: { [Op.iLike]: `%${search}%` } },
      { name: { [Op.iLike]: `%${search}%` } },
    ];
  }

  const hotels = await Hotel.findAll({
    where,
    include: [{ model: Room, as: "rooms" }],
    order: [["name", "ASC"]],
  });

  if (!checkIn && !checkOut) {
    return reply.send({ hotels: hotels.map((h) => h.toJSON()) });
  }

  const range = parseDateRange(checkIn, checkOut);
  if (range.error) {
    return reply.code(400).send({ error: "Bad Request", message: range.error });
  }

  const guestCount = guests ? Number(guests) : null;
  if (guests && (Number.isNaN(guestCount) || guestCount < 1)) {
    return reply.code(400).send({ error: "Bad Request", message: "guests must be a positive number" });
  }

  const filtered = [];
  for (const hotel of hotels) {
    const availableRooms = [];
    for (const room of hotel.rooms) {
      if (guestCount && room.capacity < guestCount) continue;
      const availableUnits = await getAvailableUnits(room, range.checkIn, range.checkOut);
      if (availableUnits > 0) {
        availableRooms.push({ ...room.toJSON(), availableUnits });
      }
    }
    if (availableRooms.length > 0) {
      filtered.push({ ...hotel.toJSON(), rooms: availableRooms });
    }
  }

  return reply.send({ hotels: filtered, checkIn, checkOut });
}

export async function getHotel(request, reply) {
  const hotel = await Hotel.findByPk(request.params.id, { include: [{ model: Room, as: "rooms" }] });
  if (!hotel || !hotel.isActive) return reply.code(404).send({ error: "Not Found", message: "Hotel not found" });

  const { checkIn, checkOut } = request.query || {};
  let rooms = hotel.rooms.map((r) => r.toJSON());

  if (checkIn && checkOut) {
    const range = parseDateRange(checkIn, checkOut);
    if (range.error) {
      return reply.code(400).send({ error: "Bad Request", message: range.error });
    }
    rooms = await Promise.all(
      hotel.rooms.map(async (room) => ({
        ...room.toJSON(),
        availableUnits: await getAvailableUnits(room, range.checkIn, range.checkOut),
      }))
    );
  }

  return reply.send({ hotel: { ...hotel.toJSON(), rooms } });
}

const AMENITY_LIMIT = 20;

function normalizeAmenities(amenities) {
  if (!Array.isArray(amenities)) return [];
  return amenities
    .filter((a) => typeof a === "string" && a.trim())
    .slice(0, AMENITY_LIMIT)
    .map((a) => a.trim().toLowerCase());
}

export async function createHotel(request, reply) {
  const { name, description, city, address, amenities, starRating, imageUrl } = request.body || {};
  if (!name || !city || !imageUrl) {
    return reply.code(400).send({ error: "Bad Request", message: "name, city, and imageUrl are required" });
  }
  const hotel = await Hotel.create({
    name,
    description,
    city,
    address,
    amenities: normalizeAmenities(amenities),
    starRating,
    imageUrl: imageUrl || null,
    ownerId: request.user.id,
  });
  return reply.code(201).send({ hotel: hotel.toJSON() });
}

export async function updateHotel(request, reply) {
  const hotel = await Hotel.findByPk(request.params.id);
  if (!hotel) return reply.code(404).send({ error: "Not Found" });
  if (hotel.ownerId !== request.user.id) {
    return reply.code(403).send({ error: "Forbidden", message: "You do not own this hotel" });
  }
  const { name, description, city, address, amenities, starRating, imageUrl } = request.body || {};
  await hotel.update({
    ...(name !== undefined && { name }),
    ...(description !== undefined && { description }),
    ...(city !== undefined && { city }),
    ...(address !== undefined && { address }),
    ...(amenities !== undefined && { amenities: normalizeAmenities(amenities) }),
    ...(starRating !== undefined && { starRating }),
    ...(imageUrl !== undefined && { imageUrl: imageUrl || null }),
  });
  return reply.send({ hotel: hotel.toJSON() });
}

export async function setHotelActive(request, reply) {
  const hotel = await Hotel.findByPk(request.params.id);
  if (!hotel) return reply.code(404).send({ error: "Not Found" });
  if (hotel.ownerId !== request.user.id) {
    return reply.code(403).send({ error: "Forbidden", message: "You do not own this hotel" });
  }
  const { isActive } = request.body || {};
  if (typeof isActive !== "boolean") {
    return reply.code(400).send({ error: "Bad Request", message: "isActive must be true or false" });
  }
  await hotel.update({ isActive });
  return reply.send({ hotel: hotel.toJSON() });
}

export async function myHotels(request, reply) {
  const hotels = await Hotel.findAll({
    where: { ownerId: request.user.id },
    include: [{ model: Room, as: "rooms" }],
    order: [["createdAt", "DESC"]],
  });
  return reply.send({ hotels: hotels.map((h) => h.toJSON()) });
}

export async function createRoom(request, reply) {
  const hotel = await Hotel.findByPk(request.params.id);
  if (!hotel) return reply.code(404).send({ error: "Not Found", message: "Hotel not found" });
  if (hotel.ownerId !== request.user.id) {
    return reply.code(403).send({ error: "Forbidden", message: "You do not own this hotel" });
  }

  const { type, description, basePrice, capacity, quantity, imageUrl } = request.body || {};
  if (!type || basePrice === undefined || !imageUrl) {
    return reply.code(400).send({ error: "Bad Request", message: "type, basePrice, and imageUrl are required" });
  }
  if (Number(basePrice) <= 0) {
    return reply.code(400).send({ error: "Bad Request", message: "basePrice must be greater than 0" });
  }

  const room = await Room.create({
    hotelId: hotel.id,
    type,
    description,
    basePrice: Number(basePrice),
    capacity: capacity ? Number(capacity) : 2,
    quantity: quantity ? Number(quantity) : 1,
    imageUrl: imageUrl || null,
  });
  return reply.code(201).send({ room });
}

export async function listRoomsForHotel(request, reply) {
  const hotel = await Hotel.findByPk(request.params.id);
  if (!hotel) return reply.code(404).send({ error: "Not Found", message: "Hotel not found" });
  const rooms = await Room.findAll({ where: { hotelId: hotel.id } });
  return reply.send({ rooms });
}

async function loadOwnedRoom(request) {
  const room = await Room.findByPk(request.params.roomId, { include: [{ model: Hotel, as: "hotel" }] });
  if (!room) return { error: { code: 404, body: { error: "Not Found", message: "Room not found" } } };
  if (room.hotel.ownerId !== request.user.id) {
    return { error: { code: 403, body: { error: "Forbidden", message: "You do not own this room" } } };
  }
  return { room };
}

export async function updateRoom(request, reply) {
  const { room, error } = await loadOwnedRoom(request);
  if (error) return reply.code(error.code).send(error.body);

  const { type, description, basePrice, capacity, quantity, imageUrl } = request.body || {};
  if (basePrice !== undefined && Number(basePrice) <= 0) {
    return reply.code(400).send({ error: "Bad Request", message: "basePrice must be greater than 0" });
  }
  await room.update({
    ...(type !== undefined && { type }),
    ...(description !== undefined && { description }),
    ...(basePrice !== undefined && { basePrice: Number(basePrice) }),
    ...(capacity !== undefined && { capacity: Number(capacity) }),
    ...(quantity !== undefined && { quantity: Number(quantity) }),
    ...(imageUrl !== undefined && { imageUrl: imageUrl || null }),
  });
  return reply.send({ room });
}

export async function deleteRoom(request, reply) {
  const { room, error } = await loadOwnedRoom(request);
  if (error) return reply.code(error.code).send(error.body);

  const bookingCount = await Booking.count({ where: { roomId: room.id, status: "confirmed" } });
  if (bookingCount > 0) {
    return reply.code(409).send({
      error: "Conflict",
      message: `Can't delete — ${bookingCount} confirmed booking(s) still reference this room type. Cancel or wait for them to complete first.`,
    });
  }

  await room.destroy();
  return reply.send({ success: true });
}
