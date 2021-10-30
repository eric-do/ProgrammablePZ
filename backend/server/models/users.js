const { query } = require('../../db');

const addTakenRide = async (userId, rideId) => {
  const q = `
    INSERT INTO user_rides (user_id, ride_id)
    VALUES ($1, $2)
  `
  const result = await query(q, [userId, rideId]);
  return result;
}

const getUserRidesTaken = async (userId) => {
  const q = `
    SELECT
      r.id,
      r.creator_id,
      r.title,
      r.type,
      r.likes,
      rr.rating,
      rr.difficulty,
      r.dislikes,
      r.total_votes,
      r.ride_count,
      r.intervals,
      r.timeInSeconds,
      r.created_on
    FROM user_rides AS u
    INNER JOIN rides as r
    on u.ride_id = r.id
    LEFT JOIN ride_ratings as rr
    on r.id = rr.ride_id
    WHERE u.user_id = $1
  `

  const rides = await query(q, [userId])
  return rides;
}

module.exports = {
  addTakenRide,
  getUserRidesTaken
}