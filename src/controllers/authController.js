const jwt = require('jsonwebtoken');
const https = require('https');
const crypto = require('crypto');
const userService = require('../services/userService');

// In-memory OTP storage: phone -> { otp, expiresAt }
const otpStore = new Map();

// Helper to generate JWT token
const generateToken = (id) => {
  const secret = process.env.JWT_SECRET || 'marathi_learning_super_secret_jwt_key_2026';
  const expiresIn = process.env.JWT_EXPIRES_IN || '30d';
  return jwt.sign({ id }, secret, { expiresIn });
};

// Deterministic time-windowed OTP generator for serverless stateless execution
const getWindowOtp = (phone, windowOffset = 0) => {
  const secret = process.env.JWT_SECRET || 'marathi_learning_super_secret_jwt_key_2026';
  // 5-minute time window
  const window = Math.floor(Date.now() / (5 * 60 * 1000)) + windowOffset;
  const hash = crypto.createHmac('sha256', secret).update(`${phone}-${window}`).digest('hex');
  const num = (parseInt(hash.slice(0, 8), 16) % 900000) + 100000;
  return num.toString();
};

/**
 * Helper to dispatch SMS via 2Factor API
 * URL Template: https://2factor.in/API/V1/{$key}/SMS/91{$phone}/{$otp}/{$template}
 */
const send2FactorSMS = (phone, otp) => {
  return new Promise((resolve) => {
    const key = process.env.TWOFACTOR_API_KEY || 'aed4d7d6-95e4-11ea-9fa5-0200cd936042';
    const template = process.env.TWOFACTOR_TEMPLATE || 'OTP1';

    if (!key || key === 'your_2factor_api_key_here') {
      console.log(`[2Factor SMS Simulation] Key not configured. Simulated SMS to +91${phone} with OTP: ${otp}`);
      return resolve({ success: true, simulated: true });
    }

    // Extract clean 10-digit Indian phone number
    const rawDigits = String(phone).replace(/\D/g, '');
    const cleanPhone = rawDigits.length > 10 ? rawDigits.slice(-10) : rawDigits;

    // Build 2Factor API endpoint URL
    let url = `https://2factor.in/API/V1/${key}/SMS/91${cleanPhone}/${otp}`;
    if (template && template !== 'AUTOGEN') {
      url += `/${template}`;
    }

    console.log(`[2Factor SMS] Dispatching HTTP GET request to: ${url}`);

    https.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        console.log(`[2Factor SMS Response]: Status ${res.statusCode}, Body: ${data}`);
        try {
          const parsed = JSON.parse(data);
          resolve({ success: parsed.Status === 'Success', data: parsed });
        } catch (e) {
          resolve({ success: false, raw: data });
        }
      });
    }).on('error', (err) => {
      console.error('[2Factor SMS Error]:', err.message);
      resolve({ success: false, error: err.message });
    });
  });
};

/**
 * @desc    Send OTP to user mobile number via 2Factor API
 * @route   POST /api/auth/send-otp
 * @access  Public
 */
const sendOtp = async (req, res) => {
  try {
    const { mobileNumber } = req.body;

    if (!mobileNumber) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a mobileNumber in the request body.',
      });
    }

    const rawDigits = String(mobileNumber).trim().replace(/\D/g, '');
    const cleanMobile = rawDigits.length > 10 ? rawDigits.slice(-10) : rawDigits;

    if (cleanMobile.length !== 10) {
      return res.status(400).json({
        success: false,
        message: 'Invalid mobile number. Must contain a valid 10-digit phone number.',
      });
    }

    // Check if test number for Play Store testing
    const isPlayStoreTestNumber = cleanMobile === '9833207555';
    const otp = isPlayStoreTestNumber ? '123456' : getWindowOtp(cleanMobile, 0);
    const expiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes expiry

    // Save to memory store
    otpStore.set(cleanMobile, { otp, expiresAt });

    // Send SMS via 2Factor API (skip for Play Store test number)
    let smsResult = { success: true };
    if (!isPlayStoreTestNumber) {
      smsResult = await send2FactorSMS(cleanMobile, otp);
    }

    return res.status(200).json({
      success: true,
      message: isPlayStoreTestNumber
        ? 'Play Store Testing Number: Use OTP 123456'
        : 'OTP sent successfully',
      mobileNumber: cleanMobile,
      otpSent: true,
      testOtp: isPlayStoreTestNumber || smsResult.simulated ? '123456' : undefined,
    });
  } catch (error) {
    console.error('[sendOtp Error]:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error while sending OTP.',
      error: error.message,
    });
  }
};

/**
 * @desc    Verify OTP and register/login user
 * @route   POST /api/auth/verify-otp
 * @access  Public
 */
const verifyOtp = async (req, res) => {
  try {
    const { mobileNumber, otp } = req.body;

    if (!mobileNumber || !otp) {
      return res.status(400).json({
        success: false,
        message: 'Please provide both mobileNumber and otp in the request body.',
      });
    }

    const rawDigits = String(mobileNumber).trim().replace(/\D/g, '');
    const cleanMobile = rawDigits.length > 10 ? rawDigits.slice(-10) : rawDigits;
    const cleanOtp = String(otp).trim();

    const storedData = otpStore.get(cleanMobile);
    const isPlayStoreTestNumber = cleanMobile === '9833207555';

    // Verify OTP matching:
    // 1. Play Store test number (9833207555) with 123456
    // 2. In-memory match if within expiry
    // 3. Deterministic time-windowed match (serverless resilient across instances)
    const isValidOtp =
      (isPlayStoreTestNumber && cleanOtp === '123456') ||
      (storedData && storedData.otp === cleanOtp && storedData.expiresAt > Date.now()) ||
      (!isPlayStoreTestNumber && (cleanOtp === getWindowOtp(cleanMobile, 0) || cleanOtp === getWindowOtp(cleanMobile, -1)));

    if (!isValidOtp) {
      return res.status(400).json({
        success: false,
        message: 'Invalid or expired OTP. Please try again.',
      });
    }


    // Clear used OTP
    otpStore.delete(cleanMobile);

    // Check if user exists
    let user = await userService.findByMobile(cleanMobile);
    let isNewUser = false;
    let statusCode = 200;
    let message = 'Login successful';

    if (!user) {
      user = await userService.createUser({
        mobileNumber: cleanMobile,
        name: 'Learner',
      });
      isNewUser = true;
      statusCode = 201;
      message = 'Account created successfully';
    }

    // Generate JWT Token
    const userId = user.id || user._id;
    const token = generateToken(userId);

    const userObj = typeof user.toJSON === 'function' ? user.toJSON() : user;

    return res.status(statusCode).json({
      success: true,
      message,
      isNewUser,
      token,
      user: userObj,
    });
  } catch (error) {
    console.error('[verifyOtp Error]:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error during OTP verification.',
      error: error.message,
    });
  }
};

/**
 * @desc    Login or Auto-Signup using Mobile Number
 * @route   POST /api/auth/mobile-auth
 * @access  Public
 */
const mobileAuth = async (req, res) => {
  try {
    const { mobileNumber } = req.body;

    if (!mobileNumber) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a mobileNumber in the request body.',
      });
    }

    const cleanMobile = String(mobileNumber).trim();
    const mobileRegex = /^[0-9]{10,15}$/;

    if (!mobileRegex.test(cleanMobile)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid mobile number. Must contain 10 to 15 numeric digits.',
      });
    }

    let user = await userService.findByMobile(cleanMobile);
    let isNewUser = false;
    let statusCode = 200;
    let message = 'Login successful';

    if (!user) {
      user = await userService.createUser({
        mobileNumber: cleanMobile,
        name: 'Learner',
      });
      isNewUser = true;
      statusCode = 201;
      message = 'Account created successfully';
    }

    const userId = user.id || user._id;
    const token = generateToken(userId);
    const userObj = typeof user.toJSON === 'function' ? user.toJSON() : user;

    return res.status(statusCode).json({
      success: true,
      message,
      isNewUser,
      token,
      user: userObj,
    });
  } catch (error) {
    console.error('[mobileAuth Error]:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error during mobile authentication.',
      error: error.message,
    });
  }
};

/**
 * @desc    Get Authenticated User Profile
 * @route   GET /api/auth/profile
 * @access  Private (Bearer Token required)
 */
const getProfile = async (req, res) => {
  try {
    const userObj = typeof req.user.toJSON === 'function' ? req.user.toJSON() : req.user;
    return res.status(200).json({
      success: true,
      user: userObj,
    });
  } catch (error) {
    console.error('[getProfile Error]:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error while fetching profile.',
      error: error.message,
    });
  }
};

/**
 * @desc    Update Authenticated User Profile
 * @route   PUT /api/auth/profile
 * @access  Private (Bearer Token required)
 */
const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id || req.user._id;
    const { name, email, mobileNumber, age, gender, preferredLanguage, profileImage, avatarIcon } = req.body;

    const updateFields = {};

    if (mobileNumber !== undefined) {
      const cleanMobile = String(mobileNumber).trim();
      const mobileRegex = /^[0-9]{10,15}$/;
      if (!mobileRegex.test(cleanMobile)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid mobile number. Must contain 10 to 15 numeric digits.',
        });
      }

      const existingUser = await userService.findByMobile(cleanMobile);
      if (existingUser && String(existingUser.id) !== String(userId)) {
        return res.status(400).json({
          success: false,
          message: 'This mobile number is already registered with another user account.',
        });
      }
      updateFields.mobileNumber = cleanMobile;
    }

    if (name !== undefined) updateFields.name = String(name).trim();
    if (email !== undefined) updateFields.email = String(email).trim();
    if (age !== undefined) updateFields.age = Number(age);
    if (gender !== undefined) {
      const validGenders = ['Male', 'Female', 'Other', 'Not Specified'];
      if (!validGenders.includes(gender)) {
        return res.status(400).json({
          success: false,
          message: `Invalid gender. Allowed values: ${validGenders.join(', ')}`,
        });
      }
      updateFields.gender = gender;
    }
    if (preferredLanguage !== undefined) updateFields.preferredLanguage = String(preferredLanguage).trim();
    if (profileImage !== undefined || avatarIcon !== undefined) {
      updateFields.profileImage = String(profileImage || avatarIcon).trim();
    }

    if (updateFields.name || updateFields.profileImage) {
      updateFields.isProfileComplete = true;
    }

    const updatedUser = await userService.updateUser(userId, updateFields);

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: 'User not found.',
      });
    }

    const userObj = typeof updatedUser.toJSON === 'function' ? updatedUser.toJSON() : updatedUser;

    return res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      user: userObj,
    });
  } catch (error) {
    console.error('[updateProfile Error]:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error while updating profile.',
      error: error.message,
    });
  }
};

/**
 * @desc    Soft Delete User Account
 * @route   DELETE /api/auth/profile
 * @access  Private (Bearer Token required)
 */
const deleteAccount = async (req, res) => {
  try {
    const userId = req.user.id || req.user._id;
    const success = await userService.softDeleteUser(userId);

    if (!success) {
      return res.status(404).json({
        success: false,
        message: 'User not found or already deleted.',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Account successfully deleted.',
    });
  } catch (error) {
    console.error('[deleteAccount Error]:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error while deleting account.',
      error: error.message,
    });
  }
};

module.exports = {
  sendOtp,
  verifyOtp,
  mobileAuth,
  getProfile,
  updateProfile,
  deleteAccount,
};

