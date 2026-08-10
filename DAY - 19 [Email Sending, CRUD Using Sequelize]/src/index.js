require('dotenv').config();

const Fastify = require('fastify');
const sequelize = require('./config/database');
const bookingRoutes = require('./routes/bookingRoutes');
const errorHandler = require('./middleware/errorHandler');

const PORT = Number(process.env.PORT) || 3000;

const fastify = Fastify({ logger: true });

fastify.get('/', async () => ({
  message: 'Booking CRUD + Email Practice API is running',
}));

fastify.register(bookingRoutes, { prefix: '/bookings' });
fastify.setErrorHandler(errorHandler);

async function startServer() {
  await sequelize.sync();
  console.log('Database connected. "bookings" table is ready.');

  await fastify.listen({ port: PORT, host: '0.0.0.0' });
  console.log(`Try: GET http://localhost:${PORT}/bookings`);
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});