require('dotenv').config()
const {createPool} = require("mysql");

const pool = createPool({
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PWD,
    database: process.env.MYSQL_DB,
    connectionLimit: 10
});

module.exports = pool;