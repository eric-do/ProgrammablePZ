const AuthModel = require('../models/auth');

const registerUser = async (req, res, next) => {
  const credentials = req.body;

  try {
    const user = await AuthModel.registerUser(credentials);

    res.locals.user = user;
    res.status(201);
    next()
  } catch (err) {
    next(err);
  }
}

const sendUser = (req, res, next) => {
  res.send(res.locals.data);
}

module.exports = {
  registerUser,
  sendUser
};