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
    id,
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

module.exports = {
  formatRide
};