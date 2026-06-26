const express = require('express');
const router = express.Router();
const { register, login, getMe, forgotPassword } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');
const { validateRequest } = require('../middleware/validateRequest');
const { registerValidator, loginValidator, forgotPasswordValidator } = require('../validators/authValidator');
const { authLimiter } = require('../middleware/rateLimiter');

router.post('/register', authLimiter, registerValidator, validateRequest, register);
router.post('/login', authLimiter, loginValidator, validateRequest, login);
router.get('/me', protect, getMe);
router.post('/forgot-password', authLimiter, forgotPasswordValidator, validateRequest, forgotPassword);

module.exports = router;
