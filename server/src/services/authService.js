const User = require('../models/User');
const generateToken = require('../utils/generateToken');
const ActivityLog = require('../models/ActivityLog');

const registerUser = async ({ name, email, password }) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw { statusCode: 400, message: 'User with this email already exists' };
  }

  const user = await User.create({ name, email, password });

  await ActivityLog.create({
    user: user._id,
    action: 'register',
    description: 'New user registered',
  });

  return {
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    token: generateToken(user._id),
  };
};

const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    throw { statusCode: 401, message: 'Invalid email or password' };
  }

  const isMatch = await user.matchPassword(password);
  if (!isMatch) {
    throw { statusCode: 401, message: 'Invalid email or password' };
  }

  await ActivityLog.create({
    user: user._id,
    action: 'login',
    description: 'User logged in',
  });

  return {
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    avatar: user.avatar,
    token: generateToken(user._id),
  };
};

const getUserProfile = async (userId) => {
  const user = await User.findById(userId);
  if (!user) {
    throw { statusCode: 404, message: 'User not found' };
  }
  return user;
};

const updateUserProfile = async (userId, updateData) => {
  const user = await User.findByIdAndUpdate(userId, updateData, {
    new: true,
    runValidators: true,
  });

  if (!user) {
    throw { statusCode: 404, message: 'User not found' };
  }

  await ActivityLog.create({
    user: userId,
    action: 'profile-update',
    description: 'Profile updated',
  });

  return user;
};

const changePassword = async (userId, currentPassword, newPassword) => {
  const user = await User.findById(userId).select('+password');
  if (!user) {
    throw { statusCode: 404, message: 'User not found' };
  }

  const isMatch = await user.matchPassword(currentPassword);
  if (!isMatch) {
    throw { statusCode: 400, message: 'Current password is incorrect' };
  }

  user.password = newPassword;
  await user.save();

  await ActivityLog.create({
    user: userId,
    action: 'password-change',
    description: 'Password changed',
  });

  return { message: 'Password updated successfully' };
};

module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  changePassword,
};
