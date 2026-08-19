import { authenticate, requireRole } from "../middleware/auth.js";
import { createBooking, myBookings, cancelBooking } from "../controllers/bookingController.js";

export default async function bookingRoutes(fastify) {
  fastify.post("/api/bookings", { preHandler: [authenticate, requireRole("guest")] }, createBooking);
  fastify.get("/api/bookings/me", { preHandler: [authenticate, requireRole("guest")] }, myBookings);
  fastify.post("/api/bookings/:id/cancel", { preHandler: authenticate }, cancelBooking);
}
