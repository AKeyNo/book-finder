const { Pool } = require('pg');
const pool = new Pool({
  user: 'postgres',
  host: 'db',
  database: 'book-finder',
  password: 'postgres',
  port: 5432,
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
