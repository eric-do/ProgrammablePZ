const { query } = require('../../db');

const registerUser = async ({ email, username, password  }) => {
  const q = `
    INSERT INTO users (email, username, password)
    VALUES ($1, $2, crypt($3, gen_salt('bf', 8)))
    RETURNING id, email, username
  `

  const rows =  await query(q, [email, username, password]);
  const user = rows[0];
  return user;
};

module.exports = {
  registerUser
};