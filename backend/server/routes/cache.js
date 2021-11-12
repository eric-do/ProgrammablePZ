const express = require('express');
const router = express.Router();
const apicache = require('../lib/apicache');

router.get('/index', (req, res) => {
  res.send(apicache.getIndex())
})

router.get('/performance', (req, res) => {
  res.send(apicache.getPerformance())
})

module.exports = router;