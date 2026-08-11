// models/ReaderProfile.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db/connection');

const ReaderProfile = sequelize.define('ReaderProfile', {
  bio: DataTypes.TEXT,
  readerId: { type: DataTypes.INTEGER, unique: true } // enforces true 1:1
});

module.exports = ReaderProfile;