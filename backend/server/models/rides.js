const { query } = require('../../db');

const getRides = async (
  limit = 10,
  types,
  lengths
) => {
  const q = `
    SELECT * FROM rides
    WHERE ($1::VARCHAR IS NULL OR type = $1)
    AND ($2::INT IS NULL OR timeInSeconds = $2)
    ORDER BY created_on DESC
    LIMIT $3
  `;

  const rides = await query(q, [types, lengths, limit]);
  return rides;
}

module.exports = {
  getRides
}