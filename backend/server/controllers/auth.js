const AuthModel = require('../models/auth');
const { AuthorizationError } = require('../utils/errors');

const registerUser = async (req, res, next) => {
  const credentials = req.body;
  try {
    const user = await AuthModel.registerUser(credentials);

    res.locals.user = user;
    res.status(201);
    next()
  } catch (err) {
    console.log(err)
    next(err);
  }
}

const getUserByLogin = async (req, res, next) => {
  const credentials = req.body;

  try {
    const { id, username, email} = await AuthModel.getUserByLogin(credentials);

    if (!id) { throw new Error('Invalid login') }

    res.locals.user = { id, username, email };
    next();
  } catch (err) {
    next(new AuthorizationError(err));
  }
}

const sendUser = (req, res, next) => {
  res.send(res.locals.data);
}

module.exports = {
  registerUser,
  getUserByLogin,
  sendUser
};