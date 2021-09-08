const { Pool } = require('pg');

const prodConfig = {
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
}

const devConfig = {
  connectionString: 'postgres://postgres@localhost:5432/ppz'
}

const pool = process.env.DATABASE_URL
             ? new Pool(prodConfig)
             : new Pool(devConfig)

module.exports = {
  query: async (text, params, callback) => {
    const start = Date.now()
    const { rows } = await pool.query(text, params)
    const duration = Date.now() - start;
    console.log('executed query', { text, duration });
    return rows;
  }
}