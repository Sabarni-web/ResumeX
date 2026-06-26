const { body } = require('express-validator');

const resumeUploadValidator = [
  // File validation is handled by multer, this validates optional metadata
];

module.exports = { resumeUploadValidator };
