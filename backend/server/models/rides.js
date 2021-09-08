const { query } = require('../../db');

const getRides = async () => {
  const q = `SELECT * FROM rides`;

  try {
    const rides = await query(q, []);
    return rides;
  } catch (e) {
    console.log(e);
  }
}

module.exports = {
  getRides
}