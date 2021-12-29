require('newrelic');
require('dotenv').config()
const app = require('./app');
const db = require('../db')
const redisClient = require('../cache');

const server = app.listen(process.env.PORT || 3001);

const cleanup = () => {
  redisClient.quit(function() {
    console.log('Redis client stopped.');
    server.close(function() {
        console.log('Server stopped.');
        process.exit();
    });
  });
};

process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);

module.exports = server;