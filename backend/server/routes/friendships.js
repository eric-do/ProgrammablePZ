const express = require('express');
const router = express.Router();
const responseHandler = require('../middleware/responseHandler');
const { validateToken } = require('../middleware/auth');
const {
  addFriendship,
  getFriends,
  getFollowers,
  getFriendshipData
} = require('../controllers/friendships');

router.post(
  '/create',
  validateToken,
  addFriendship,
  responseHandler
);

router.get(
  '/friends',
  validateToken,
  getFriends,
  responseHandler
);

router.get(
  '/followers',
  validateToken,
  getFollowers,
  responseHandler
);

router.get(
  '/metadata',
  validateToken,
  getFriendshipData,
  responseHandler
);

module.exports = router;