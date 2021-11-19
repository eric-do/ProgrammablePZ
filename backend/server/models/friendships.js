const { query } = require('../../db');

const addFriendship = async (userId, friendId) => {
  const q = `
    INSERT INTO user_follows (user_id, friend_id)
    VALUES ($1, $2)
  `
  const response = await query(q, [userId, friendId]);
  return response;
}

const getFriendIds = async (userId) => {
  const q = `
    SELECT u.id, u.username
    FROM user_follows uf, users u
    WHERE
      u.id = uf.friend_id
    AND
      uf.user_id = $1
  `
  const ids = await query(q, [userId]);
  return ids;
}

module.exports = {
  addFriendship,
  getFriendIds
}