const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user')

router.post('/rides', UserController.addTakenRide);

module.exports = router;