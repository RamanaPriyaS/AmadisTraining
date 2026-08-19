import "dotenv/config";
import { initDatabase, User, Hotel, Room, Booking, sequelize } from "../models/index.js";
import { hashPassword } from "../models/User.js";

async function seed() {
  await initDatabase({ sync: true, alter: true });

  console.log("Clearing existing data...");
  await Booking.destroy({ where: {}, truncate: true, cascade: true });
  await Room.destroy({ where: {}, truncate: true, cascade: true });
  await Hotel.destroy({ where: {}, truncate: true, cascade: true });
  await User.destroy({ where: {}, truncate: true, cascade: true });

  console.log("Creating users...");
  const adminPass = await hashPassword("admin123");
  const guestPass = await hashPassword("guest123");

  const admin = await User.create({
    name: "Priya Sharma",
    email: "admin@hotelbooking.test",
    passwordHash: adminPass,
    role: "hotel_admin",
  });

  const guest = await User.create({
    name: "Alex Guest",
    email: "guest@hotelbooking.test",
    passwordHash: guestPass,
    role: "guest",
  });

  console.log("Creating hotels & rooms...");
  const photo = (seed, w = 900, h = 560) => `https://picsum.photos/seed/${seed}/${w}/${h}`;

  const seaside = await Hotel.create({
    name: "Seaside Grand",
    description: "A breezy waterfront hotel with panoramic ocean views and a rooftop pool.",
    city: "Goa",
    address: "12 Beach Road, Goa",
    amenities: ["wifi", "pool", "spa", "beach-access"],
    starRating: 5,
    imageUrl: photo("seaside-grand"),
    ownerId: admin.id,
  });

  const cityCentral = await Hotel.create({
    name: "City Central Suites",
    description: "Modern business hotel steps from the financial district.",
    city: "Mumbai",
    address: "88 Marine Drive, Mumbai",
    amenities: ["wifi", "gym", "business-center", "parking"],
    starRating: 4,
    imageUrl: photo("city-central-suites"),
    ownerId: admin.id,
  });

  const mountainLodge = await Hotel.create({
    name: "Mountain Pine Lodge",
    description: "A cozy retreat surrounded by pine forests, perfect for a quiet getaway.",
    city: "Manali",
    address: "3 Ridge Trail, Manali",
    amenities: ["wifi", "fireplace", "hiking-trails"],
    starRating: 3,
    imageUrl: photo("mountain-pine-lodge"),
    ownerId: admin.id,
  });

  await Room.bulkCreate([
    { hotelId: seaside.id, type: "Ocean View Double", basePrice: 9500, capacity: 2, quantity: 6, description: "Queen bed with a private balcony facing the sea.", imageUrl: photo("ocean-view-double", 700, 460) },
    { hotelId: seaside.id, type: "Family Suite", basePrice: 17500, capacity: 4, quantity: 3, description: "Two-room suite with a sofa bed, ideal for families.", imageUrl: photo("family-suite", 700, 460) },
    { hotelId: cityCentral.id, type: "Standard King", basePrice: 7200, capacity: 2, quantity: 10, description: "Compact, efficient room with a king bed and work desk.", imageUrl: photo("standard-king", 700, 460) },
    { hotelId: cityCentral.id, type: "Executive Suite", basePrice: 14500, capacity: 3, quantity: 4, description: "Corner suite with a lounge area and skyline views.", imageUrl: photo("executive-suite", 700, 460) },
    { hotelId: mountainLodge.id, type: "Cabin Twin", basePrice: 5500, capacity: 2, quantity: 5, description: "Wood-panelled cabin room with two twin beds.", imageUrl: photo("cabin-twin", 700, 460) },
    { hotelId: mountainLodge.id, type: "Loft Cottage", basePrice: 11000, capacity: 5, quantity: 2, description: "Two-storey cottage with a loft sleeping area, great for groups.", imageUrl: photo("loft-cottage", 700, 460) },
  ]);

  console.log("\n✅ Seed complete.\n");
  console.log("Demo accounts:");
  console.log("  Hotel admin -> admin@hotelbooking.test / admin123");
  console.log("  Guest       -> guest@hotelbooking.test / guest123\n");

  await sequelize.close();
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
