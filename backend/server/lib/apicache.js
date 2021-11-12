const apicache = require('apicache');
const redisClient = require('../../cache');

const cacheWithRedis = apicache.options({ redisClient });

module.exports = cacheWithRedis;