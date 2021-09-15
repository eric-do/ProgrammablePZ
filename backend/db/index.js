const { Pool } = require('pg');

const prodConfig = {
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
}

const devConfig = {
  connectionString: process.env.DATABASE_URL
}

const pool = process.env.NODE_ENV === 'production'
             ? new Pool(prodConfig)
             : new Pool(devConfig)

module.exports = {
  query: async (text, params, callback) => {
    const { rows } = await pool.query(text, params)
    return rows;
  },
}