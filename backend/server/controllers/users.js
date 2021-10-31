const UsersModel = require('../models/users');
const { BadRequestError, InternalServerError } = require('../utils/errors');

const addTakenRide = async (req, res, next) => {
  const { userId } = req.params;
  const { rideId } = req.body;

  try {
    await UsersModel.addTakenRide(userId, rideId)
    res.status(201);
    next()
  } catch (err) {
    next(new BadRequestError(err));
  }
}

const getUserRidesTaken = async (req, res, next) => {
  const { userId } = req.params;

  try {
    const rides = await UsersModel.getUserRidesTaken(userId);
    res.locals.data = rides;
    res.status(200);
    next();
  } catch(err) {
    console.log(err)
    next(new BadRequestError(err));
  }
}

module.exports = {
  addTakenRide,
  getUserRidesTaken
}