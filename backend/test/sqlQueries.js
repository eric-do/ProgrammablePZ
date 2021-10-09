const insertRide = `
      INSERT INTO rides (
        type, title, timeInSeconds, intervals
      ) VALUES ($1, $2, $3, $4)
      RETURNING id;
    `

const getRides = `SELECT * FROM rides`;

const deleteRide = `DELETE FROM rides WHERE title = $1`;

const deleteRideLikes = `
  DELETE FROM user_likes
  WHERE user_id
  IN (
    SELECT id
    FROM users
    WHERE email LIKE 'test%'
  )`;

const deleteTestUsers = `DELETE FROM users WHERE EMAIL LIKE 'test%'`;

module.exports = {
  insertRide,
  getRides,
  deleteRide,
  deleteRideLikes,
  deleteTestUsers
}