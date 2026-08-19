import { getRoom, getRoomAvailability, getRoomPriceQuote } from "../controllers/roomController.js";

export default async function roomRoutes(fastify) {
  fastify.get("/api/rooms/:id", getRoom);
  fastify.get("/api/rooms/:id/availability", getRoomAvailability);
  fastify.get("/api/rooms/:id/price-quote", getRoomPriceQuote);
}
