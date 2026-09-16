const jwt = require('jsonwebtoken');
const userService = require('../services/userService');

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];

      if (!token) {
        return res.status(401).json({
          success: false,
          message: 'Authentication failed. Token missing.',
        });
      }

      // Verify token
      const secret = process.env.JWT_SECRET || 'marathi_learning_super_secret_jwt_key_2026';
      const decoded = jwt.verify(token, secret);

      // Get user from the token
      const user = await userService.findById(decoded.id);

      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'User associated with token no longer exists.',
        });
      }

      // Attach user object to request
      req.user = user;
      next();
    } catch (error) {
      console.error('[Auth Middleware Error]:', error.message);
      return res.status(401).json({
        success: false,
        message: 'Not authorized. Invalid or expired token.',
        error: error.message,
      });
    }
  } else {
    return res.status(401).json({
      success: false,
      message: 'Not authorized. No Bearer token provided in Authorization header.',
    });
  }
};

module.exports = { protect };
