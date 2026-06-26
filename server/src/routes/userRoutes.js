const express = require('express');
const router = express.Router();
const { updateProfile, changePassword, getActivity } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');
const { validateRequest } = require('../middleware/validateRequest');
const { changePasswordValidator } = require('../validators/authValidator');

router.put('/profile', protect, updateProfile);
router.put('/change-password', protect, changePasswordValidator, validateRequest, changePassword);
router.get('/activity', protect, getActivity);

module.exports = router;
