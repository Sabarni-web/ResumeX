const authService = require('../services/authService');
const { successResponse, errorResponse } = require('../utils/responseFormatter');

// @desc    Register new user
// @route   POST /api/auth/register
const register = async (req, res) => {
  try {
    const result = await authService.registerUser(req.body);
    successResponse(res, result, 'Registration successful', 201);
  } catch (error) {
    errorResponse(res, error.message, error.statusCode || 500);
  }
};

// @desc    Login user
// @route   POST /api/auth/login
const login = async (req, res) => {
  try {
    const result = await authService.loginUser(req.body);
    successResponse(res, result, 'Login successful');
  } catch (error) {
    errorResponse(res, error.message, error.statusCode || 500);
  }
};

// @desc    Get current user profile
// @route   GET /api/auth/me
const getMe = async (req, res) => {
  try {
    const user = await authService.getUserProfile(req.user._id);
    successResponse(res, user, 'Profile fetched');
  } catch (error) {
    errorResponse(res, error.message, error.statusCode || 500);
  }
};

// @desc    Forgot password (simplified — returns success message)
// @route   POST /api/auth/forgot-password
const forgotPassword = async (req, res) => {
  try {
    // In production, this would send a reset email
    successResponse(res, {}, 'If an account exists with this email, a reset link has been sent.');
  } catch (error) {
    errorResponse(res, error.message, error.statusCode || 500);
  }
};

module.exports = { register, login, getMe, forgotPassword };
