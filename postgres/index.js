const { Pool } = require('pg');
const config = require('./config.json');

const pool = new Pool({
  host: config.host,
  port: config.port,
  database: config.database,
  user: config.user,
  password: config.password,
});

module.exports = pool;
