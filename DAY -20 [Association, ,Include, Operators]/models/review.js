const { DataTypes } = require('sequelize');
const sequelize = require('../db/connection');

const Review = sequelize.define('Review', {
  rating: { type: DataTypes.INTEGER, allowNull: false }, 
  comment: DataTypes.TEXT,
  readerId: DataTypes.INTEGER,
  bookId: DataTypes.INTEGER
}, {
  indexes: [
    { unique: true, fields: ['readerId', 'bookId'] } 
  ]
});

module.exports = Review;