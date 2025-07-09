const express = require('express');
const router = express.Router();

// Controllers
const authController = require('../controllers/auth.controller');

// Middlewares
const { validateRegister } = require('../middlewares/validator');
// const { auth } = require('../middlewares');

/**
 * @route   POST /api/auth/register
 * @desc    Register a new hospital staff user (doctor, nurse, frontdesk)
 * @access  Public
 */
router.post('/register', validateRegister, authController.register);

/**
 * @route   POST /api/auth/login
 * @desc    Login user and return JWT token
 * @access  Public
 */
router.post('/login', authController.login);

module.exports = router;