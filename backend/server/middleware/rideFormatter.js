const { BadRequestError } = require('../utils/errors');

const formatRide = ride => {
  const {
    id,
    creator_id,
    username,
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
  const formattedRide = {
    id,
    creator_id: creator_id ||  null,
    username: username || null,
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
  // console.log(formattedRide)
  return formattedRide;
}

module.exports = (req, res, next) => {
  try {
    if (Array.isArray(res.locals.data)) {
      res.locals.data = res.locals.data.map(formatRide);
    } else {
      res.locals.data = { ride: formatRide(res.locals.data) };
    }

    next();
  } catch (err) {
    next(new BadRequestError(err));
  }
}