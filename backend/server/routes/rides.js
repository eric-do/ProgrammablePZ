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
const rideFormatter = require('../middleware/rideFormatter');

router.get(
  '/',
  getRides,
  rideFormatter,
  sendRides
);

router.post(
  '/',
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
  '/:id/likes',
  incrementRideLikes,
  sendRides
);

module.exports = router;