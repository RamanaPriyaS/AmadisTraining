import { sequelize } from "../config/database.js";
import { User } from "./User.js";
import { Hotel } from "./Hotel.js";
import { Room } from "./Room.js";
import { Booking } from "./Booking.js";

User.hasMany(Hotel, { foreignKey: "ownerId", as: "hotels" });
Hotel.belongsTo(User, { foreignKey: "ownerId", as: "owner" });

Hotel.hasMany(Room, { foreignKey: "hotelId", as: "rooms", onDelete: "CASCADE" });
Room.belongsTo(Hotel, { foreignKey: "hotelId", as: "hotel" });

Room.hasMany(Booking, { foreignKey: "roomId", as: "bookings" });
Booking.belongsTo(Room, { foreignKey: "roomId", as: "room" });

User.hasMany(Booking, { foreignKey: "guestId", as: "bookings" });
Booking.belongsTo(User, { foreignKey: "guestId", as: "guest" });

export async function initDatabase({ sync = true, alter = false } = {}) {
  if (sync) {
    await sequelize.sync({ alter });
    try {
      await sequelize.query('ALTER TABLE hotels ALTER COLUMN "imageUrl" TYPE TEXT;');
      await sequelize.query('ALTER TABLE rooms ALTER COLUMN "imageUrl" TYPE TEXT;');
    } catch (err) {
    }
  }
}

export { sequelize, User, Hotel, Room, Booking };
