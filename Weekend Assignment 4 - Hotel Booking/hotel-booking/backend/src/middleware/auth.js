/**
 * Verifies the JWT on the request and attaches the decoded payload to
 * request.user. Use as a Fastify `preHandler`.
 */
export async function authenticate(request, reply) {
  try {
    await request.jwtVerify();
  } catch (err) {
    return reply.code(401).send({ error: "Unauthorized", message: "Missing or invalid token" });
  }
}

/**
 * Returns a preHandler that only allows the given role(s) through.
 * Must run after `authenticate`.
 */
export function requireRole(...roles) {
  return async function (request, reply) {
    if (!request.user || !roles.includes(request.user.role)) {
      return reply.code(403).send({ error: "Forbidden", message: `Requires role: ${roles.join(" or ")}` });
    }
  };
}
