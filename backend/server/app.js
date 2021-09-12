const express = require('express')
const cors = require('cors')
const app = express()
const rides = require('./routes/rides');

const errorHandler = (err, req, res, next) => {
  console.log(err);
  res.status(500).send();
};

app.use(cors());
app.use('/api/rides', rides);
app.use(errorHandler);

module.exports = app;