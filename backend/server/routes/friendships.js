const express = require('express');
const router = express.Router();
const responseHandler = require('../middleware/responseHandler');
const { validateToken } = require('../middleware/auth');
const { addFriendship, getFriendIds } = require('../controllers/friendships');

router.post(
  '/create',
  validateToken,
  addFriendship,
  responseHandler
)

router.get(
  '/ids',
  validateToken,
  getFriendIds,
  responseHandler
)


module.exports = router;