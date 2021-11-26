const express = require('express');
const cors = require('cors');
const app = express();
const morgan = require('morgan');
const ridesRouter = require('./routes/rides');
const authRouter = require('./routes/auth');
const userRouter = require('./routes/users');
const friendshipsRouter = require('./routes/friendships');
const timelineRouter = require('./routes/timeline');
const cacheRouter = require('./routes/cache');
const errorHandler = require('./middleware/errorHandler')

// App level middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('dev', {
  skip: (req, res) => process.env.NODE_ENV === 'test'
}));

// Routes
app.use('/auth', authRouter);
app.use('/api/rides', ridesRouter);
app.use('/api/users', userRouter);
app.use('/api/friendships', friendshipsRouter);
app.use('/api/me/timeline', timelineRouter);
app.use('/api/cache', cacheRouter);

// App level error handling
app.use(errorHandler);

module.exports = app;