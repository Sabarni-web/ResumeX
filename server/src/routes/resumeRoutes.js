const express = require('express');
const router = express.Router();
const { uploadResume, getResumes, getResume, deleteResume } = require('../controllers/resumeController');
const { protect } = require('../middleware/authMiddleware');
const { handleUploadError } = require('../middleware/uploadMiddleware');
const { uploadLimiter } = require('../middleware/rateLimiter');

router.post('/upload', protect, uploadLimiter, handleUploadError, uploadResume);
router.get('/', protect, getResumes);
router.get('/:id', protect, getResume);
router.delete('/:id', protect, deleteResume);

module.exports = router;
