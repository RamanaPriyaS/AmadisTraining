require('dotenv').config();
const { Sequelize } = require('sequelize');
const {DB_NAME}=require('./createDatabase');

const sequelize = new Sequelize(
    DB_NAME, 
    process.env.DB_USER, 
    process.env.DB_PASSWORD, 
    {
        host: process.env.DB_HOST,
        dialect: 'postgres',
        logging: false,
});

module.exports = sequelize;