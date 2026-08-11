const {DataTypes} = require('sequelize');
const sequelize = require('../db/connection');

const Book = sequelize.define('Book', {
    title: { type: DataTypes.STRING, allowNull: false },
    price: { type: DataTypes.DECIMAL(10, 2) },
    published :{ type: DataTypes.BOOLEAN, defaultValue: true },
    authorId: { type: DataTypes.INTEGER, allowNull: true },
    categoryId: { type: DataTypes.INTEGER, allowNull: true },

});

module.exports = Book;