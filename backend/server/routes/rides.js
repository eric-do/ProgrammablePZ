const express = require('express');
const router = express.Router();
const {
  getRides,
  getRideById,
  sendRides
} = require('../controllers/rides');
const rideFormatter = require('../middleware/rideFormatter');

router.get(
  '/',
  getRides,
  rideFormatter,
  sendRides
);
router.get('/:id', getRideById);

module.exports = router;