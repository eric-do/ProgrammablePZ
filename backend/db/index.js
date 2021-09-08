const { Pool } = require('pg');

const localDb = 'postgres://postgres@localhost:5432/ppz';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || localDb,
  // ssl: {
  //   rejectUnauthorized: false
  // }
});

// module.exports = {
//   query: (text, params, callback) => {
//     const start = Date.now()
//     return pool.query(text, params, (err, res) => {
//       const duration = Date.now() - start;
//       console.log(err, res)
//       console.log('executed query', { text, duration });
//     });
//   }
// }

module.exports = {
  query: async (text, params, callback) => {
    const start = Date.now()
    const { rows } = await pool.query(text, params)
    const duration = Date.now() - start;
    console.log('executed query', { text, duration });
    return rows;
  }
}