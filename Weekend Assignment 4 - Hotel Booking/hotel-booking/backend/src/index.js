import "dotenv/config";
import Fastify from "fastify";
import cors from "@fastify/cors";
import jwt from "@fastify/jwt";

import { initDatabase } from "./models/index.js";
import authRoutes from "./routes/auth.js";
import hotelRoutes from "./routes/hotels.js";
import roomRoutes from "./routes/rooms.js";
import bookingRoutes from "./routes/bookings.js";
import adminRoutes from "./routes/admin.js";
import { cancellationPolicySummary } from "./utils/cancellation.js";

const INSECURE_DEFAULT_SECRET = "dev-only-insecure-secret-change-me";
const jwtSecret = process.env.JWT_SECRET || INSECURE_DEFAULT_SECRET;

if (process.env.NODE_ENV === "production" && jwtSecret === INSECURE_DEFAULT_SECRET) {
  console.error("\n❌  Refusing to start: JWT_SECRET is unset (or still the dev placeholder) in production.\n");
  process.exit(1);
}

const fastify = Fastify({ logger: true, trustProxy: true });

await fastify.register(cors, { origin: true });
await fastify.register(jwt, { secret: jwtSecret });

fastify.setErrorHandler((error, request, reply) => {
  if (error.validation) {
    return reply.code(400).send({ error: "Bad Request", message: error.message });
  }
  request.log.error(error);
  const statusCode = error.statusCode && error.statusCode < 500 ? error.statusCode : 500;
  return reply
    .code(statusCode)
    .send({ error: statusCode === 500 ? "Server Error" : error.name, message: error.message });
});

fastify.get("/api/health", async () => ({
  status: "ok",
  time: new Date().toISOString(),
  cancellationPolicy: cancellationPolicySummary,
}));

await fastify.register(authRoutes);
await fastify.register(hotelRoutes);
await fastify.register(roomRoutes);
await fastify.register(bookingRoutes);
await fastify.register(adminRoutes);

fastify.setNotFoundHandler((request, reply) => {
  reply.code(404).send({ error: "Not Found", message: `No route: ${request.method} ${request.url}` });
});

const start = async () => {
  try {
    await initDatabase({ sync: true });
    const port = Number(process.env.PORT || 4000);
    const host = process.env.HOST || "0.0.0.0";
    await fastify.listen({ port, host });
    console.log(`\n🏨  Hotel Booking API ready at http://localhost:${port}\n`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
