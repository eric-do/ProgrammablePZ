const { query } = require('../../db');

const addFriendship = async (userId, friendId) => {
  const q = `
    INSERT INTO user_follows (user_id, friend_id)
    VALUES ($1, $2)
  `
  const response = await query(q, [userId, friendId]);
  return response;
}

const destroyFriendship = async (userId, friendId) => {
  const q = `
    DELETE FROM user_follows uf
    WHERE
      uf.user_id = $1
    AND
      uf.friend_id = $2
  `
  const response = await query(q, [userId, friendId]);
  return response;
}


const getFriends = async (userId) => {
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

const getFriendCount = async (userId) => {
  const q = `
    SELECT COUNT(user_id) AS count
    FROM user_follows uf
    WHERE uf.user_id = $1
  `
  const result = await query(q, [userId]);
  return parseInt(result[0].count);
}


const getFollowers = async (userId) => {
  const q = `
    SELECT u.id, u.username
    FROM user_follows uf, users u
    WHERE
      u.id = uf.user_id
    AND
      uf.friend_id = $1
  `
  const ids = await query(q, [userId]);
  return ids;
}

const getFollowerCount = async (userId) => {
  const q = `
    SELECT COUNT(user_id) AS count
    FROM user_follows uf
    WHERE uf.friend_id = $1
  `
  const result = await query(q, [userId]);
  return parseInt(result[0].count);
}

module.exports = {
  addFriendship,
  destroyFriendship,
  getFriends,
  getFollowers,
  getFriendCount,
  getFollowerCount
}