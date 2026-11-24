const mysql = require('mysql2/promise');

require('dontev').config();

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    waitConnections: true,
    connectionLimit: 10,
    queueLimit: 0
})

module.exports = pool;