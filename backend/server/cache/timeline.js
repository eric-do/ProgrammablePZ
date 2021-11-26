const redis = require('../../cache');
const apicache = require('../lib/apicache');

const setTimelineCacheConfig = (req, res, next) => {
  const { id } = res.locals.data.user
  req.apicacheGroup = id;
  next();
}

const clearTimelineFromCache = (req, res, next) => {
  const { id } = res.locals.data.user
  apicache.clear(id);
  next();
}

module.exports = {
  setTimelineCacheConfig,
  clearTimelineFromCache
}