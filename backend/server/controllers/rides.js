const RideModel = require('../models/rides');
const { formatRide } = require('../utils')

const getRides = async (req, res) => {
  try {
    let {
      type,
      timeInSeconds,
      limit = 10
    } = req.query;

    type = type === 'all' ? rideTypes : type;
    timeInSeconds = timeInSeconds === 'all' ? lengths : timeInSeconds;

    const rides = await RideModel.getRides(limit, type, timeInSeconds);
    const formattedRides = rides.map(formatRide);

    res.status(200).send(formattedRides);
  } catch (err) {
    console.log(err)
    res.status(500).send();
  }
}

module.exports = {
  getRides,
}