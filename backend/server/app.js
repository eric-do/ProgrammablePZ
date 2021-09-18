const express = require('express')
const cors = require('cors')
const app = express()
const rides = require('./routes/rides');
const auth = require('./routes/auth');
const errorHandler = require('./middleware/errorHandler')

// App level middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Routes
app.use('/api/rides', rides);
app.use('/auth', auth);

// App level error handling
app.use(errorHandler);

module.exports = app;