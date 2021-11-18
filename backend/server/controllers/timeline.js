const UserModel = require('../models/users');
const TimelineModel = require('../models/timeline');
const {
  InternalServerError,
  BadRequestError } = require('../utils/errors');

const getTimeline = async (req, res, next) => {
  const { id: user_id } = res.locals.data.user;

  try {
    res.locals.data = await TimelineModel.getTimeline(user_id);
    res.status(200);
    next();
  } catch (err) {
    next(new InternalServerError(err));
  }
}

module.exports = {
  getTimeline,
}