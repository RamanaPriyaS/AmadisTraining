import { authenticate } from "../middleware/auth.js";
import { register, login, me } from "../controllers/authController.js";

export default async function authRoutes(fastify) {
  fastify.post("/api/auth/register", register);
  fastify.post("/api/auth/login", login);
  fastify.get("/api/auth/me", { preHandler: authenticate }, me);
}
