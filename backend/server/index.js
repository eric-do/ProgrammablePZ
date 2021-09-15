require('dotenv').config()
const app = require('./app');
const db = require('../db')

const server = app.listen(process.env.PORT || 3001);

module.exports = server;