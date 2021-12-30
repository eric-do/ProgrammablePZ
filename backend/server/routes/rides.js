const express = require('express');
const router = express.Router();
const responseHandler = require('../middleware/responseHandler');
const {
  getRides,
  addRide,
  addRideRating,
  getRideRatings,
  getRideById,
  incrementRideCount,
  incrementRideLikes,
  refreshAdminRides,
  sendRides,
  sendCreatedRide
} = require('../controllers/rides');
const { addRideToCache, clearRideFromCache } = require('../cache/rides');
const apicache = require('../lib/apicache').middleware;
const { validateToken } = require('../middleware/auth');
const rideFormatter = require('../middleware/rideFormatter');

router.get(
  '/',
  getRides,
  rideFormatter,
  responseHandler
);

router.post(
  '/',
  validateToken,
  addRide,
  refreshAdminRides,
  rideFormatter,
  responseHandler
);

router.get(
  '/:id',
  apicache('5 minutes'),
  getRideById,
  rideFormatter,
  addRideToCache,
  responseHandler
);

router.post(
  '/:id/ratings',
  validateToken,
  addRideRating,
  refreshAdminRides,
  responseHandler
)

router.get(
  '/:id/ratings',
  getRideRatings,
  responseHandler
)

router.post(
  '/:id/ride-count',
  clearRideFromCache,
  incrementRideCount,
  refreshAdminRides,
  responseHandler
);

router.post(
  '/like',
  validateToken,
  incrementRideLikes,
  refreshAdminRides,
  responseHandler
);

module.exports = router;