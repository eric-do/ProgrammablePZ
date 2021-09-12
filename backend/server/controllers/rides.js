const RideModel = require('../models/rides');
const { formatRide } = require('../utils')

const getRides = async (req, res, next) => {
  try {
    let {
      type,
      timeInSeconds,
      limit = 10
    } = req.query;

    type = type === 'all' ? rideTypes : type;
    timeInSeconds = timeInSeconds === 'all' ? lengths : timeInSeconds;

    res.locals.data = await RideModel.getRides(limit, type, timeInSeconds);
    next();
  } catch (err) {
    next(err);
  }
}

const getRideById = async (req, res, next) => {
  const { id } = req.params;

  try {
    res.locals.data =  await RideModel.getRideById(id)
    next();
  } catch (err) {
    next(err);
  }
}

const sendRides = (req, res) => {
  res.status(200).send(res.locals.data);
}

module.exports = {
  getRides,
  getRideById,
  sendRides
}