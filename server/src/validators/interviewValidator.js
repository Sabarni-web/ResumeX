const { body } = require('express-validator');

const startInterviewValidator = [
  body('targetRole')
    .trim()
    .notEmpty()
    .withMessage('Target role is required'),
  body('difficulty')
    .optional()
    .isIn(['easy', 'medium', 'hard', 'mixed'])
    .withMessage('Invalid difficulty level'),
  body('resumeId')
    .optional()
    .isMongoId()
    .withMessage('Invalid resume ID'),
  body('jobDescriptionId')
    .optional()
    .isMongoId()
    .withMessage('Invalid job description ID'),
];

const submitAnswerValidator = [
  body('questionIndex')
    .notEmpty()
    .withMessage('Question index is required')
    .isInt({ min: 0 })
    .withMessage('Question index must be a non-negative integer'),
  body('answer')
    .trim()
    .notEmpty()
    .withMessage('Answer is required')
    .isLength({ min: 10 })
    .withMessage('Answer must be at least 10 characters'),
  body('timeSpent')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Time spent must be a non-negative integer'),
];

module.exports = { startInterviewValidator, submitAnswerValidator };
