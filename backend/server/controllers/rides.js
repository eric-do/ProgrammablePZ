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

const getRides = async (req, res) => {
  try {
    const rides = await RideModel.getRides();
    const formattedRides = rides.map(formatRide);
    res.status(200).send(formattedRides);
  } catch (e) {
    res.status(500).send()
  }
}

module.exports = { getRides }