require('dotenv').config();
const {Client} = require('pg');

const DB_NAME = process.env.DB_NAME;

async function createDatabaseIfNotExists() {
    const client = new Client({
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT,
        database: 'postgres'
    });

    await client.connect();

    const res = await client.query(`SELECT 1 FROM pg_database WHERE datname='${DB_NAME}'`);
    if (res.rowCount === 0) {
        await client.query(`CREATE DATABASE ${DB_NAME}`);
        console.log(`Database ${DB_NAME} created successfully.`);
    } else {
        console.log(`Database ${DB_NAME} already exists.`);
    }

    await client.end();
}

module.exports = { createDatabaseIfNotExists, DB_NAME };
