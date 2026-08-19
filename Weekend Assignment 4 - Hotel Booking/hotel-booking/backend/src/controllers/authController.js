import { User, hashPassword } from "../models/User.js";
import {
  validatePasswordStrength,
  MAX_FAILED_LOGIN_ATTEMPTS,
  LOCKOUT_DURATION_MS,
} from "../utils/password.js";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function register(request, reply) {
  const { name, email, password, role } = request.body || {};

  if (!name || !name.trim() || !email || !password) {
    return reply.code(400).send({ error: "Bad Request", message: "name, email and password are required" });
  }
  const cleanEmail = String(email).toLowerCase().trim();
  if (!EMAIL_RE.test(cleanEmail)) {
    return reply.code(400).send({ error: "Bad Request", message: "Please enter a valid email address" });
  }

  const strength = validatePasswordStrength(password, { name, email: cleanEmail });
  if (!strength.valid) {
    return reply.code(400).send({ error: "Bad Request", message: strength.message });
  }

  const safeRole = role === "hotel_admin" ? "hotel_admin" : "guest";

  const existing = await User.findOne({ where: { email: cleanEmail } });
  if (existing) {
    return reply.code(409).send({ error: "Conflict", message: "An account with this email already exists" });
  }

  const passwordHash = await hashPassword(password);
  const user = await User.create({
    name: name.trim(),
    email: cleanEmail,
    passwordHash,
    role: safeRole,
  });

  const token = request.server.jwt.sign(
    { id: user.id, role: user.role, name: user.name, email: user.email },
    { expiresIn: "7d" }
  );

  return reply.code(201).send({ token, user: user.toSafeJSON() });
}

export async function login(request, reply) {
  const { email, password } = request.body || {};
  if (!email || !password) {
    return reply.code(400).send({ error: "Bad Request", message: "email and password are required" });
  }

  const cleanEmail = String(email).toLowerCase().trim();
  const user = await User.findOne({ where: { email: cleanEmail } });

  const invalidMessage = "Invalid email or password";

  if (!user) {
    return reply.code(401).send({ error: "Unauthorized", message: invalidMessage });
  }

  if (user.lockedUntil && user.lockedUntil > new Date()) {
    const minutesLeft = Math.ceil((user.lockedUntil.getTime() - Date.now()) / 60000);
    return reply.code(423).send({
      error: "Locked",
      message: `Too many failed attempts. Try again in ${minutesLeft} minute${minutesLeft === 1 ? "" : "s"}.`,
    });
  }

  const valid = await user.validatePassword(password);
  if (!valid) {
    const attempts = user.failedLoginAttempts + 1;
    const update = { failedLoginAttempts: attempts };
    if (attempts >= MAX_FAILED_LOGIN_ATTEMPTS) {
      update.lockedUntil = new Date(Date.now() + LOCKOUT_DURATION_MS);
      update.failedLoginAttempts = 0;
    }
    await user.update(update);

    if (update.lockedUntil) {
      return reply.code(423).send({
        error: "Locked",
        message: "Too many failed attempts. This account is temporarily locked for 15 minutes.",
      });
    }
    return reply.code(401).send({ error: "Unauthorized", message: invalidMessage });
  }

  if (user.failedLoginAttempts > 0 || user.lockedUntil) {
    await user.update({ failedLoginAttempts: 0, lockedUntil: null });
  }

  const token = request.server.jwt.sign(
    { id: user.id, role: user.role, name: user.name, email: user.email },
    { expiresIn: "7d" }
  );

  return reply.send({ token, user: user.toSafeJSON() });
}

export async function me(request, reply) {
  const user = await User.findByPk(request.user.id);
  if (!user) return reply.code(404).send({ error: "Not Found" });
  return reply.send({ user: user.toSafeJSON() });
}
