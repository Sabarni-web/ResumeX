const { body } = require('express-validator');

const jobDescriptionValidator = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Job title is required')
    .isLength({ max: 200 })
    .withMessage('Job title cannot exceed 200 characters'),
  body('description')
    .trim()
    .notEmpty()
    .withMessage('Job description is required')
    .isLength({ min: 50 })
    .withMessage('Job description must be at least 50 characters'),
  body('company')
    .optional()
    .trim()
    .isLength({ max: 200 })
    .withMessage('Company name cannot exceed 200 characters'),
  body('roleType')
    .optional()
    .isIn(['frontend', 'backend', 'fullstack', 'data', 'devops', 'mobile', 'ml', 'other'])
    .withMessage('Invalid role type'),
];

const jobMatchValidator = [
  body('resumeId')
    .notEmpty()
    .withMessage('Resume ID is required')
    .isMongoId()
    .withMessage('Invalid resume ID'),
];

module.exports = { jobDescriptionValidator, jobMatchValidator };
