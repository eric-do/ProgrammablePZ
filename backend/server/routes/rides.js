const express = require('express');
const router = express.Router();
const {
  getRides,
  addRide,
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
  sendRides
);

router.post(
  '/',
  validateToken,
  addRide,
  rideFormatter,
  sendCreatedRide
);

router.get(
  '/:id',
  getRideById,
  rideFormatter,
  sendRides
);

router.post(
  '/:id/ride-count',
  incrementRideCount,
  sendRides
);

router.post(
  '/like',
  validateToken,
  incrementRideLikes,
  sendRides
);

module.exports = router;