const RideModel = require('../models/rides');

const formatRide = ride => {
  const {
    id,
    type,
    title,
    created_on,
    likes,
    ride_count,
    timeinseconds,
    total_votes,
    intervals
  } = ride;

  return {
    type,
    title,
    metadata: {
      rideCount: ride_count
    },
    ratings: {
      likes,
      total: total_votes
    },
    intervals,
    timeInSeconds: timeinseconds
  }
}

const rideTypes = 'pz,pze,pzm,ftp';
const lengths = '1200,1800,2700,3600'

const getRides = async (req, res) => {
  try {
    let {
      type = rideTypes,
      timeInSeconds = lengths,
      limit = 10
    } = req.query;

    type = type === 'all' ? rideTypes : type;
    timeInSeconds = timeInSeconds === 'all' ? lengths : timeInSeconds;

    const typesList = type.split(',');
    const lengthsList = timeInSeconds.split(',');
    const rides = await RideModel.getRides(limit, typesList, lengthsList);
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