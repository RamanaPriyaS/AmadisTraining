// models/Reader.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db/connection');

const Reader = sequelize.define('Reader', {
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, unique: true }
});

module.exports = Reader;