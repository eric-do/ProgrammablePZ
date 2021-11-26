const express = require('express');
const router = express.Router();
const responseHandler = require('../middleware/responseHandler');
const apicache = require('../lib/apicache').middleware;
const { setTimelineCacheConfig } = require('../cache/timeline');
const { validateToken } = require('../middleware/auth');
const { getTimeline } = require('../controllers/timeline');
const rideFormatter = require('../middleware/rideFormatter')

router.get(
  '/',
  validateToken,
  apicache('1 hour'),
  setTimelineCacheConfig,
  getTimeline,
  rideFormatter,
  responseHandler
)

module.exports = router;