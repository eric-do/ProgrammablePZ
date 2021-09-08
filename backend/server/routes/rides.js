const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  const rides = [{
    type: 'pze',
    title: 'Flat Twos',
    metadata: {
      rideCount: 378
    },
    ratings: {
      up: 600,
      total: 640
    },
    intervals: [
      {
        zone: 1,
        length: 180
      },
      {
        zone: 2,
        length: 30
      },
      {
        zone: 1,
        length: 30
      },
      {
        zone: 2,
        length: 30
      },
      {
        zone: 1,
        length: 30
      },
      {
        zone: 2,
        length: 120
      },
      {
        zone: 1,
        length: 60
      },
      {
        zone: 2,
        length: 2200
      },
    ],
    timeInSeconds: 2700
  }
  ]
  res.send(rides);
})

module.exports = router;