import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

export const Booking = sequelize.define(
  "Booking",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    roomId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    guestId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    checkIn: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    checkOut: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    guestCount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      validate: { min: 1 },
    },
    totalPrice: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("confirmed", "cancelled"),
      allowNull: false,
      defaultValue: "confirmed",
    },
    cancelledAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    refundAmount: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    refundPercent: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    tableName: "bookings",
  }
);

export default Booking;
