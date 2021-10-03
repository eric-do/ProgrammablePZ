const redis = require('../../cache');

const keyGenerator = (listType, filters) => {
  const filterKeyValues = Object.entries(filters)
                            .map(([k, v]) => `${k}_${v}`)
                            .join('_');

  return `${listType}_${filterKeyValues}`
}

const getCachedRides = (req, res, next) => {
  const key = keyGenerator('popularRides', req.query)

  redis.get(key, (err, rides) => {
    if (err) {
      console.log(err)
      next('route');
    } else if (!rides) {
      next('route');
    } else {
      const parsedRides = JSON.parse(rides);
      res.locals.data = parsedRides;
      next();
    }
  })
}

const setCachedRides = (req, res, next) => {
  const {
    user,
    type,
    timeInSeconds,
    limit = 10
  } = req.query;

  const key = keyGenerator('popularRides', req.query)
  const timeToExpire = 60 * 60 * 1;

  redis.set(
    key,
    JSON.stringify(res.locals.data), 'EX', timeToExpire, (err, res) => {
      if (err) {
        console.log(err)
        next();
      } else {
        next();
      }
  });
}

module.exports = {
  getCachedRides,
  setCachedRides
}