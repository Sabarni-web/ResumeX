const upload = require('../config/multer');

const uploadResume = upload.single('resume');

const handleUploadError = (req, res, next) => {
  uploadResume(req, res, (err) => {
    if (err) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({
          success: false,
          message: 'File too large. Maximum size is 10MB.',
        });
      }
      return res.status(400).json({
        success: false,
        message: err.message || 'File upload error',
      });
    }
    next();
  });
};

module.exports = { handleUploadError };
