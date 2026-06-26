const authService = require('../services/authService');
const ActivityLog = require('../models/ActivityLog');
const { successResponse, errorResponse } = require('../utils/responseFormatter');

// @desc    Update user profile
// @route   PUT /api/users/profile
const updateProfile = async (req, res) => {
  try {
    const allowedFields = ['name', 'phone', 'bio', 'skills', 'targetRole', 'experienceLevel', 'avatar'];
    const updateData = {};
    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        updateData[field] = req.body[field];
      }
    });

    const user = await authService.updateUserProfile(req.user._id, updateData);
    successResponse(res, user, 'Profile updated');
  } catch (error) {
    errorResponse(res, error.message, error.statusCode || 500);
  }
};

// @desc    Change password
// @route   PUT /api/users/change-password
const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const result = await authService.changePassword(req.user._id, currentPassword, newPassword);
    successResponse(res, result, 'Password changed');
  } catch (error) {
    errorResponse(res, error.message, error.statusCode || 500);
  }
};

// @desc    Get user activity log
// @route   GET /api/users/activity
const getActivity = async (req, res) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    const activities = await ActivityLog.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));
    const total = await ActivityLog.countDocuments({ user: req.user._id });

    successResponse(res, { activities, total, page: parseInt(page), limit: parseInt(limit) });
  } catch (error) {
    errorResponse(res, error.message, 500);
  }
};

module.exports = { updateProfile, changePassword, getActivity };
