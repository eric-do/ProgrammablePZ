const express = require('express');
const router = express.Router();
const {
  getRides,
  getRideById,
  incrementRideCount,
  incrementRideLikes,
  sendRides
} = require('../controllers/rides');
const rideFormatter = require('../middleware/rideFormatter');

router.get(
  '/',
  getRides,
  rideFormatter,
  sendRides
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