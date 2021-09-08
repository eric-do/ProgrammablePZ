const express = require('express');
const router = express.Router();
const { getRides } = require('../controllers/rides');

router.get('/', getRides)

module.exports = router;