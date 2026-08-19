import { Room, Hotel } from "../models/index.js";
import { parseDateRange, getAvailableUnits, getBookedCountForNight } from "../utils/availability.js";
import { computeStayPrice } from "../utils/pricing.js";

export async function getRoom(request, reply) {
  const room = await Room.findByPk(request.params.id, { include: [{ model: Hotel, as: "hotel" }] });
  if (!room) return reply.code(404).send({ error: "Not Found", message: "Room not found" });
  return reply.send({ room });
}

// GET /api/rooms/:id/availability?checkIn=YYYY-MM-DD&checkOut=YYYY-MM-DD
export async function getRoomAvailability(request, reply) {
  const room = await Room.findByPk(request.params.id);
  if (!room) return reply.code(404).send({ error: "Not Found", message: "Room not found" });

  const { checkIn, checkOut } = request.query || {};
  const range = parseDateRange(checkIn, checkOut);
  if (range.error) return reply.code(400).send({ error: "Bad Request", message: range.error });

  const availableUnits = await getAvailableUnits(room, range.checkIn, range.checkOut);
  return reply.send({
    roomId: room.id,
    checkIn,
    checkOut,
    availableUnits,
    isAvailable: availableUnits > 0,
    totalQuantity: room.quantity,
  });
}

// GET /api/rooms/:id/price-quote?checkIn=&checkOut= — dynamic pricing preview
export async function getRoomPriceQuote(request, reply) {
  const room = await Room.findByPk(request.params.id);
  if (!room) return reply.code(404).send({ error: "Not Found", message: "Room not found" });

  const { checkIn, checkOut } = request.query || {};
  const range = parseDateRange(checkIn, checkOut);
  if (range.error) return reply.code(400).send({ error: "Bad Request", message: range.error });

  const quote = await computeStayPrice(room.basePrice, range.checkIn, range.checkOut, room.quantity, (night) =>
    getBookedCountForNight(room.id, night)
  );
  return reply.send({ roomId: room.id, checkIn, checkOut, ...quote });
}
