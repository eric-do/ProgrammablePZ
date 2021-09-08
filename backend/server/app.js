const express = require('express')
const cors = require('cors')
const app = express()
const rides = require('./routes/rides');

app.use(cors());
app.use('/api/rides', rides);

module.exports = app;