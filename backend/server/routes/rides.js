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
  sendRides,
  sendCreatedRide
} = require('../controllers/rides');
const {
  getCachedRides,
  setCachedRides
} = require('../cache/rides');
const { validateToken } = require('../middleware/auth');
const rideFormatter = require('../middleware/rideFormatter');

// router.get(
//   '/',
//   getCachedRides,
//   rideFormatter,
//   sendRides
// );

router.get(
  '/',
  getRides,
  setCachedRides,
  rideFormatter,
  responseHandler
);

router.post(
  '/',
  validateToken,
  addRide,
  rideFormatter,
  responseHandler
);

router.get(
  '/:id',
  getRideById,
  rideFormatter,
  responseHandler
);

router.post(
  '/:id/ratings',
  validateToken,
  addRideRating,
  responseHandler
)

router.get(
  '/:id/ratings',
  getRideRatings,
  responseHandler
)

router.post(
  '/:id/ride-count',
  incrementRideCount,
  responseHandler
);

router.post(
  '/like',
  validateToken,
  incrementRideLikes,
  responseHandler
);

module.exports = router;