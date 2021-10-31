const express = require('express');
const router = express.Router();
const responseHandler = require('../middleware/responseHandler');
const { validateToken } = require('../middleware/auth');
const rideFormatter = require('../middleware/rideFormatter');
const UserController = require('../controllers/users')

router.post(
  '/:userId/rides_taken',
  validateToken,
  UserController.addTakenRide,
  responseHandler
);

router.get(
  '/:userId/rides_taken',
  UserController.getUserRidesTaken,
  rideFormatter,
  responseHandler
);

module.exports = router;