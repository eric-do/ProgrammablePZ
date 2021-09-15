const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/auth');
const AuthMiddleware = require('../middleware/auth');

router.post(
  '/register',
  AuthController.registerUser,
  AuthMiddleware.generateToken,
  AuthController.sendUser
);

router.get(
  '/validate',
  AuthMiddleware.validateToken,
  AuthController.sendUser
);

module.exports = router;