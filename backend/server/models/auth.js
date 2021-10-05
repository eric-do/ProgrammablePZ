const { query } = require('../../db');

const registerUser = async ({ email, username, password  }) => {
  const q = `
    INSERT INTO users (email, username, password)
    VALUES ($1, $2, crypt($3, gen_salt('bf', 8)))
    RETURNING id, email, username
  `;

  const rows =  await query(q, [email, username, password]);
  const user = rows[0];
  return user;
};

const getUserByLogin = async ({ username, password }) => {
  const q = `
    SELECT * FROM users
    WHERE LOWER(username) = $1
    AND password = crypt($2, password)
  `;

  const rows = await query(q, [username, password]);
  return rows[0];
}

module.exports = {
  registerUser,
  getUserByLogin
};