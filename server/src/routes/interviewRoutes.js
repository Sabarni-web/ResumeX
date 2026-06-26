const express = require('express');
const router = express.Router();
const { startInterview, submitAnswer, completeInterview, getInterviews, getInterview } = require('../controllers/interviewController');
const { protect } = require('../middleware/authMiddleware');
const { validateRequest } = require('../middleware/validateRequest');
const { startInterviewValidator, submitAnswerValidator } = require('../validators/interviewValidator');

router.post('/start', protect, startInterviewValidator, validateRequest, startInterview);
router.post('/:id/answer', protect, submitAnswerValidator, validateRequest, submitAnswer);
router.post('/:id/complete', protect, completeInterview);
router.get('/', protect, getInterviews);
router.get('/:id', protect, getInterview);

module.exports = router;
