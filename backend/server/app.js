const express = require('express')
const cors = require('cors')
const app = express()
const ridesRouter = require('./routes/rides');
const authRouter = require('./routes/auth');
const userRouter = require('./routes/users');
const errorHandler = require('./middleware/errorHandler')

// App level middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Routes
app.use('/auth', authRouter);
app.use('/api/rides', ridesRouter);
app.use('/api/users', userRouter);

// App level error handling
app.use(errorHandler);

module.exports = app;