const { query } = require('../../db');

const getUserById = async (userId) => {
  const q = `
    SELECT * FROM users
    WHERE id = $1
  `;
  const results = await query(q, [userId]);
  return results[0];
}

const lookupByUsername = async (username, currentUser) => {
  const q = `
    SELECT
      u.id,
      u.username,
      CASE
        WHEN uf.friend_id IS NULL THEN FALSE
        ELSE TRUE
      END AS is_friend
    FROM users u
    LEFT JOIN user_follows uf
    ON u.id = uf.friend_id
    WHERE
      LOWER(u.username) != LOWER('${currentUser}')
    AND
      LOWER(u.username) LIKE LOWER('${username}%')
  `;

  const results = await query(q);
  return results;
}

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
      u.id,
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
    ORDER BY u.ridden_at DESC
  `

  const rides = await query(q, [userId])
  return rides;
}

module.exports = {
  getUserById,
  lookupByUsername,
  addTakenRide,
  getUserRidesTaken
}