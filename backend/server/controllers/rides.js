const RideModel = require('../models/rides');
const { formatRide } = require('../utils')
const { InternalServerError } = require('../utils/errors');

const getRides = async (req, res, next) => {
  try {
    let {
      type,
      timeInSeconds,
      limit = 10
    } = req.query;

    type = type === 'all' ? null : type;
    timeInSeconds = timeInSeconds === 'all' ? null : timeInSeconds;

    res.locals.data = await RideModel.getRides(limit, type, timeInSeconds);
    next();
  } catch (err) {
    next(new InternalServerError(err));
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
  const { id } = req.params;

  try {
    res.locals.data = await RideModel.incrementRideLikes(id);
    next()
  } catch (err) {
    next(new InternalServerError(err));
  }
}

const sendRides = (req, res) => {
  res.status(200).send(res.locals.data);
}

module.exports = {
  getRides,
  getRideById,
  incrementRideCount,
  incrementRideLikes,
  sendRides
}