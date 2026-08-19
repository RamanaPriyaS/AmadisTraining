import { authenticate, requireRole } from "../middleware/auth.js";
import { getOccupancyReport, getHotelBookings, getDashboardSummary } from "../controllers/adminController.js";

export default async function adminRoutes(fastify) {
  const adminOnly = { preHandler: [authenticate, requireRole("hotel_admin")] };
  fastify.get("/api/admin/occupancy", adminOnly, getOccupancyReport);
  fastify.get("/api/admin/bookings", adminOnly, getHotelBookings);
  fastify.get("/api/admin/dashboard", adminOnly, getDashboardSummary);
}
