const RideModel = require('../models/rides');
const { formatRide } = require('../utils')
const {
  InternalServerError,
  BadRequestError } = require('../utils/errors');

const getRides = async (req, res, next) => {
  try {
    let {
      user,
      type,
      timeInSeconds,
      limit = 10,
      offset = 0,
    } = req.query;

    type = type === 'all' ? null : type;
    timeInSeconds = timeInSeconds === 'all' ? null : timeInSeconds;

    if (user) {
      res.locals.data = await RideModel.getRidesByUser(user, limit, type, timeInSeconds);
    } else {
      res.locals.data = await RideModel.getRides(type, timeInSeconds, limit, offset);
    }
    next();
  } catch (err) {
    next(new InternalServerError(err));
  }
}

const addRide = async (req, res, next) => {
  const { id: userId } = res.locals.data.user;
  const { ride } = req.body;
  try {
    res.locals.data = await RideModel.addRide(ride, userId)
    next();
  } catch (err) {
    next(new BadRequestError(err));
  }
}

const addRideRating = async (req, res, next) => {
  const { id: userId } = res.locals.data.user;
  const { id: rideId } = req.params;
  const { rating, difficulty } = req.body;

  try {
    await RideModel.addRideRating(rideId, userId, { rating, difficulty })
    res.status(201);
    res.locals.data = "Rating successfully added to ride."
    next();
  } catch (err) {
    next(new BadRequestError(err));
  }
}

const getRideRatings = async (req, res, next) => {
  const { id } = req.params;
  try {
    const ratings = await RideModel.getRideRatings(id)
    console.log(ratings)
    res.locals.data = { id, ratings };
    next();
  } catch (err) {
    console.log(err);
    res.status(500).send(err)
  }

}

const getRideById = async (req, res, next) => {
  const { id } = req.params;

  try {
    res.locals.data =  await RideModel.getRideById(id)
    next();
  } catch (err) {
    next(new InternalServerError(err));
  }
}

const incrementRideCount = async (req, res, next) => {
  const { id } = req.params;

  try {
    res.locals.data = await RideModel.incrementRideCount(id);
    next()
  } catch (err) {
    next(new InternalServerError(err));
  }
}

const incrementRideLikes = async (req, res, next) => {
  const { rideId } = req.query;
  const { id: userId } = res.locals.data.user;

  try {
    res.locals.data = await RideModel.incrementRideLikes(rideId, userId);
    next()
  } catch (err) {
    next(new InternalServerError(err));
  }
}

const sendRides = (req, res) => {
  res.status(200).send(res.locals.data);
}

const sendCreatedRide = (req, res) => {
  const { data: ride } = res.locals
  res.status(201).send({ ride });
}

module.exports = {
  getRides,
  addRide,
  addRideRating,
  getRideRatings,
  getRideById,
  incrementRideCount,
  incrementRideLikes,
  sendRides,
  sendCreatedRide
}