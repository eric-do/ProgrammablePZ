const formatRide = ride => {
  const {
    id,
    type,
    title,
    created_on,
    likes,
    ride_count,
    rating,
    difficulty,
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
      rating,
      difficulty,
      likes,
      total: total_votes
    },
    intervals,
    timeInSeconds: timeinseconds
  }
}

module.exports = (req, res, next) => {
  if (Array.isArray(res.locals.data)) {
    res.locals.data = res.locals.data.map(formatRide);
  } else {
    res.locals.data = { ride: formatRide(res.locals.data) };
  }

  next();
}