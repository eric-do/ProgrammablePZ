require('dotenv').config()
process.env.NODE_ENV = 'test'
require('./auth');
require('./rides');
require('./likes');