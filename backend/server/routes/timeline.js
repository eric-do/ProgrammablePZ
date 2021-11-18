const express = require('express');
const router = express.Router();
const responseHandler = require('../middleware/responseHandler');
const { validateToken } = require('../middleware/auth');
const { getTimeline } = require('../controllers/timeline');
const rideFormatter = require('../middleware/rideFormatter')

router.get(
  '/',
  validateToken,
  getTimeline,
  rideFormatter,
  responseHandler
)

module.exports = router;