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
    SELECT
      u.id,
      u.username,
      CASE
        WHEN uf.friend_id IS NULL THEN FALSE
        ELSE TRUE
      END AS is_friend
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


const getFollowers = async (userId, limit, offset) => {
  const q = `
    SELECT
      u.id,
      u.username,
      case when b.user_id is null then -- No record in b if 3 didn't follow this user back.
        false
      else
        true
      end as is_friend
    FROM
      user_follows f -- IDs of followers of user 3
      INNER JOIN users u  -- User information of those followers
        ON u.id = f.user_id
      LEFT JOIN user_follows b  -- Check if 3 follows them back.
        ON b.user_id = f.friend_id and
            b.friend_id = u.id
    WHERE
      f.friend_id = $1
    LIMIT $2
    OFFSET $3
  `
  const ids = await query(q, [userId, limit, offset]);
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