import { authenticate, requireRole } from "../middleware/auth.js";
import {
  listHotels,
  getHotel,
  createHotel,
  updateHotel,
  setHotelActive,
  myHotels,
  createRoom,
  listRoomsForHotel,
  updateRoom,
  deleteRoom,
} from "../controllers/hotelController.js";

export default async function hotelRoutes(fastify) {
  fastify.get("/api/hotels", listHotels);
  fastify.get("/api/hotels/:id", getHotel);
  fastify.post("/api/hotels", { preHandler: [authenticate, requireRole("hotel_admin")] }, createHotel);
  fastify.put("/api/hotels/:id", { preHandler: [authenticate, requireRole("hotel_admin")] }, updateHotel);
  fastify.patch(
    "/api/hotels/:id/active",
    { preHandler: [authenticate, requireRole("hotel_admin")] },
    setHotelActive
  );
  fastify.get("/api/my-hotels", { preHandler: [authenticate, requireRole("hotel_admin")] }, myHotels);
  fastify.post("/api/hotels/:id/rooms", { preHandler: [authenticate, requireRole("hotel_admin")] }, createRoom);
  fastify.get("/api/hotels/:id/rooms", listRoomsForHotel);
  fastify.put(
    "/api/hotels/:hotelId/rooms/:roomId",
    { preHandler: [authenticate, requireRole("hotel_admin")] },
    updateRoom
  );
  fastify.delete(
    "/api/hotels/:hotelId/rooms/:roomId",
    { preHandler: [authenticate, requireRole("hotel_admin")] },
    deleteRoom
  );
}
