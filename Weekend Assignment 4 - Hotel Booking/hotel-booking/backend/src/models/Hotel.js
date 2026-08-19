import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

export const Hotel = sequelize.define(
  "Hotel",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { notEmpty: true },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { notEmpty: true },
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    amenities: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: [],
    },
    starRating: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: { min: 1, max: 5 },
    },
    imageUrl: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    ownerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "hotels",
  }
);

export default Hotel;
