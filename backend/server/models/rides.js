const { query, getClient, releaseClient } = require('../../db');

const getRides = async (
  types,
  lengths,
  limit = 10,
  offset
) => {
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
    FROM rides as r
    LEFT JOIN (
      SELECT
        ride_id AS id,
        ROUND(AVG(rating), 1)::float as rating,
        ROUND(AVG(difficulty), 1)::float as difficulty
      FROM ride_ratings
      GROUP BY ride_id
    ) AS rr
      ON rr.id = r.id
    LEFT JOIN users as u
      ON u.id = r.creator_id
    WHERE ($1::VARCHAR IS NULL OR r.type = $1)
      AND ($2::INT IS NULL OR r.timeInSeconds = $2)
      AND (r.creator_id IS NULL OR u.admin = True)
    ORDER BY created_on DESC
    LIMIT $3 OFFSET $4
  `;

  const rides = await query(q, [types, lengths, limit, offset]);
  return rides;
}

const getRidesCreatedByUser = async (
  user,
  types,
  lengths,
  limit = 10,
  offset
) => {
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
    FROM rides as r
    LEFT JOIN (
      SELECT
        ride_id AS id,
        ROUND(AVG(rating), 1)::float as rating,
        ROUND(AVG(difficulty), 1)::float as difficulty
      FROM ride_ratings
      GROUP BY ride_id
    ) AS rr
      ON rr.id = r.id
    INNER JOIN users as u
      ON u.id = r.creator_id
    WHERE u.username = $1
      AND ($2::VARCHAR IS NULL OR r.type = $2)
      AND ($3::INT IS NULL OR r.timeInSeconds = $3)
    ORDER BY r.created_on DESC
    LIMIT $4 OFFSET $5
  `;

  const rides = await query(q, [user, types, lengths, limit, offset]);
  return rides;
}

const getRidesTakenByUser = async (userId, limit, offset) => {
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
    FROM user_rides as u
    INNER JOIN rides as r
      ON u.ride_id = r.id
    WHERE u.user_id = ?
    LIMIT ?
    OFFSET ?
  `
}

const addRide = async (ride, userId) => {
  const q = `
    INSERT INTO rides (
      type, title, timeInSeconds,
      intervals, creator_id
    ) VALUES ($1, $2, $3, $4, $5)
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
    JSON.stringify(ride.intervals),
    userId
  ])

  return rows[0];
}

const addRideRating = async (rideId, userId, ratings) => {
  const q = `
  INSERT INTO ride_ratings (ride_id, user_id, rating, difficulty)
  VALUES ($1, $2, $3, $4)
  `;

  return await query(q, [rideId, userId, ratings.rating, ratings.difficulty])
}

const getRideRatings = async (rideId) => {
  const q = `
    SELECT
      ROUND(AVG(rating), 1)::float as rating,
      ROUND(AVG(difficulty), 1)::float as difficulty
    FROM ride_ratings
    WHERE ride_id = $1
  `;

  const results = await query(q, [rideId]);
  return results[0];
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

const incrementRideLikes = async (rideId, userId) => {
  const updateRide = `
    UPDATE rides
      SET likes = likes + 1,
          total_votes = total_votes + 1
    WHERE id = $1
  `;

  const updateUserLikes = `
    INSERT INTO user_likes (ride_id, user_id)
    VALUES ($1, $2)
  `
  try {
    const client = await getClient();

    try {
      await client.query('BEGIN');
      await client.query(updateRide, [rideId]);
      await client.query(updateUserLikes, [rideId, userId]);
      await client.query('COMMIT')
    } catch (err) {
      await client.query('ROLLBACK');
      throw 'Error adding new like';
    } finally {
      await client.release();
    }
  } catch (err) {
    throw 'Error executing query';
  }
}

const getRideById = async (rideId) => {
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
    FROM rides as r
    LEFT JOIN (
      SELECT
        ride_id AS id,
        ROUND(AVG(rating), 1)::float as rating,
        ROUND(AVG(difficulty), 1)::float as difficulty
      FROM ride_ratings
      GROUP BY ride_id
    ) AS rr
      ON rr.id = r.id
    WHERE r.id = $1`;
  const rides = await query(q, [rideId]);
  return rides[0];
}

module.exports = {
  getRides,
  getRidesCreatedByUser,
  addRide,
  addRideRating,
  getRideRatings,
  getRideById,
  incrementRideCount,
  incrementRideLikes
}