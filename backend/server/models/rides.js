const { query } = require('../../db');

const getRides = async (
  limit = 10,
  types = ['pz', 'pze', 'pzm', 'ftp'],
  lengths = [1200, 1800, 2700, 3600]
) => {
  const q = `
    SELECT * FROM rides
    WHERE type = ANY ($1)
    AND timeInSeconds = ANY ($2)
    ORDER BY created_on DESC
    LIMIT $3
  `;

  try {
    const rides = await query(q, [types, lengths, limit]);
    return rides;
  } catch (e) {
    console.log(e);
  }
}

module.exports = {
  getRides
}