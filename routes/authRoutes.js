const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.get('/login', authController.renderLogin);
router.post('/login', authController.loginUser);

router.get('/signup', authController.renderSignup);
router.post('/signup', authController.registerUser);

router.get('/logout', authController.logoutUser);

module.exports = router;
