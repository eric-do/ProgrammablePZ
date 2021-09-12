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

module.exports = (req, res, next) => {
  res.locals.data = Array.isArray(res.locals.data)
                    ? res.locals.data.map(formatRide)
                    : formatRide(res.locals.data)
  next();
}