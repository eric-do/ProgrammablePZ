const { Pool, PoolClient } = require('pg');

const prodConfig = {
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
}

const devConfig = {
  connectionString: process.env.DATABASE_URL
}

const testConfig = {
  connectionString: process.env.TEST_DATABASE_URL
}

const pool = process.env.NODE_ENV === 'production'
             ? new Pool(prodConfig)
             : process.env.NODE_ENV === 'test'
             ? new Pool(testConfig)
             : new Pool(devConfig)

module.exports = {
  query: async (text, params, callback) => {
    const { rows } = await pool.query(text, params)
    return rows;
  },
  getClient: async () => {
    const client = await pool.connect();
    return client;
  },
  releaseClient: async (client) => {
    await client.release();
  },
  transaction: async (callback) => {
    const client = await pool.connect();

    try {
      await client.query('BEGIN');
      try {
        await callback(client);
        await client.query('COMMIT');
      } catch (err) {
        await client.query('ROLLBACK');
      }
    } finally {
        client.release();
    }
  }
}