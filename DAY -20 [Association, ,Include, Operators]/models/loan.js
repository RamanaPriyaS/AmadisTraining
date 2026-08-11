const { DataTypes } = require('sequelize');
const sequelize = require('../db/connection');

const Loan = sequelize.define('Loan', {
  readerId: DataTypes.INTEGER,
  bookId: DataTypes.INTEGER,
  borrowedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  returnedAt: { type: DataTypes.DATE, allowNull: true } // null = still borrowed
});

module.exports = Loan;