const jwt = require('jsonwebtoken');
const { AuthenticationError } = require('../utils/errors');

const generateToken = (req, res, next) => {
  const { user } = res.locals;
  const token = jwt.sign(
    user,
    process.env.SECRET_TOKEN,
    { expiresIn: '1h' }
  )
  res.locals.data = { jwt: token, user }
  next();
}

const validateToken = (req, res, next) => {
  const { authorization } = req.headers;
  try {
    const token = authorization && authorization.split(' ')[1];

    if (!token) throw 'Token not found';

    const user = jwt.verify(token, process.env.SECRET_TOKEN);
    res.locals.data = { jwt: token, user}
    next();
  } catch (err) {
    next(new AuthenticationError(err));
  }
}

module.exports = {
  generateToken,
  validateToken
}