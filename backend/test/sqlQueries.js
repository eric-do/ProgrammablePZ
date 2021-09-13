const insertRide = `
      INSERT INTO rides (
        type, title, ride_count,
        likes, total_votes, timeInSeconds,
        created_on, intervals
      ) VALUES ($1, $2, $3, $4, $5, $6, NOW(), $7)
      RETURNING id;
    `

const getRides = `SELECT * FROM rides`;

const deleteRide = `DELETE FROM rides WHERE title = $1`;

module.exports = {
  insertRide,
  getRides,
  deleteRide
}