const redis = require('../../cache');
const apicache = require('../lib/apicache');

const addRideToCache = (req, res, next) => {
  const { id } = req.params;
  req.apicacheGroup = id;
  next();
}

const clearRideFromCache = (req, res, next) => {
  const { id } = req.params;
  apicache.clear(id);
  next();
}

module.exports = {
  addRideToCache,
  clearRideFromCache
}