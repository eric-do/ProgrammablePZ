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

const addRide = async (ride) => {
  const q = `
    INSERT INTO rides (
      type, title, timeInSeconds,
      intervals, created_on
    ) VALUES ($1, $2, $3, $4, NOW())
    RETURNING
      id,
      type,
      title,
      created_on,
      likes,
      ride_count,
      timeinseconds,
      total_votes,
      intervals
  `

  const rows = await query(q, [
    ride.type,
    ride.title,
    ride.timeInSeconds,
    JSON.stringify(ride.intervals)
  ])

  return rows[0];
}

const incrementRideCount = async (rideId) => {
  const q = `
    UPDATE rides
      SET ride_count = ride_count + 1
    WHERE id = $1
  `;

  const rows = await query(q, [rideId]);
  return rows;
}

const incrementRideLikes = async (rideId) => {
  const q = `
    UPDATE rides
      SET likes = likes + 1
    WHERE id = $1
  `;

  const rows = await query(q, [rideId]);
  return rows;
}

const getRideById = async (rideId) => {
  const q = `SELECT * FROM rides WHERE id = $1`;
  const rides = await query(q, [rideId]);
  return rides[0];
}

module.exports = {
  getRides,
  addRide,
  getRideById,
  incrementRideCount,
  incrementRideLikes
}