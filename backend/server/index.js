const app = require('./app');
require('dotenv').config()

const server = app.listen(process.env.PORT || 3001);

module.exports = server;