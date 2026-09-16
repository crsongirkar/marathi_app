const express = require('express');
const router = express.Router();
const { sendOtp, verifyOtp, mobileAuth, getProfile, updateProfile, deleteAccount } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

/**
 * @route   POST /api/auth/send-otp
 * @desc    Send OTP via 2Factor API
 * @access  Public
 */
router.post('/send-otp', sendOtp);

/**
 * @route   POST /api/auth/verify-otp
 * @desc    Verify OTP and return Token + isNewUser flag
 * @access  Public
 */
router.post('/verify-otp', verifyOtp);

/**
 * @route   POST /api/auth/mobile-auth
 * @desc    Login or register user using mobile number
 * @access  Public
 */
router.post('/mobile-auth', mobileAuth);

/**
 * @route   GET /api/auth/profile
 * @desc    Get user profile details
 * @access  Private (Bearer Token)
 */
router.get('/profile', protect, getProfile);

/**
 * @route   PUT /api/auth/profile
 * @desc    Update user profile details
 * @access  Private (Bearer Token)
 */
router.put('/profile', protect, updateProfile);

/**
 * @route   DELETE /api/auth/profile
 * @desc    Soft Delete User Account
 * @access  Private (Bearer Token)
 */
router.delete('/profile', protect, deleteAccount);

module.exports = router;

