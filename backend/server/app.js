const express = require('express')
const cors = require('cors')
const app = express()
const rides = require('./routes/rides');
const errorHandler = require('./middleware/errorHandler')

app.use(cors());
app.use('/api/rides', rides);
app.use(errorHandler);

module.exports = app;