const AuthModel = require('../models/auth');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
  const credentials = req.body;

  try {
    const user = await AuthModel.registerUser(credentials);
    const token = jwt.sign(user, process.env.SECRET_TOKEN);
    res.status(201).send({ jwt: token, user })
  } catch (err) {
    console.log(err);
    res.status(500).send();
  }
}

module.exports = {
  registerUser
};