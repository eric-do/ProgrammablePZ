const { promisify } = require("util");
const redis = require('redis');
const client = process.env.NODE_ENV === 'production'
               ? redis.createClient(process.env.REDIS_URL)
               : redis.createClient();

module.exports = client;