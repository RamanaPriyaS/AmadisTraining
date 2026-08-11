const {DataTypes} = require('sequelize');
const sequelize = require('../db/connection');

const Category = sequelize.define('Category', {
    name: { type: DataTypes.STRING, allowNull: false },
    parentId: { type: DataTypes.INTEGER, allowNull: true },
});

module.exports = Category;