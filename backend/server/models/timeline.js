const { query } = require('../../db');

const getTimeline = async (
  userId,
  {
    limit = 10,
    offset = 0
  }
) => {
  const q = `
    SELECT
      r.id,
      r.creator_id,
      u.username,
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
    FROM rides AS r
    LEFT JOIN (
      SELECT
        ride_id AS id,
        ROUND(AVG(rating), 1)::float as rating,
        ROUND(AVG(difficulty), 1)::float as difficulty
      FROM ride_ratings
      GROUP BY ride_id
    ) AS rr
      ON rr.id = r.id
    LEFT JOIN users AS u
      on u.id = r.creator_id
    WHERE u.id IN (
      SELECT friend_id
      FROM user_follows
      WHERE user_id = $1
    )
    ORDER BY r.created_on DESC
    LIMIT $2
    OFFSET $3
  `
  const rides = await query(q, [userId, limit, offset]);
  return  rides;
}

module.exports = {
  getTimeline
}