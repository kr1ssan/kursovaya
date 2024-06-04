const { Pool } = require('pg');
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'App',
    password: 'Igor004765',
    port: 5432,
});

module.exports = pool;
