const interviewService = require('../services/interviewService');
const { successResponse, errorResponse } = require('../utils/responseFormatter');

// @desc    Start a new interview session
// @route   POST /api/interviews/start
const startInterview = async (req, res) => {
  try {
    const session = await interviewService.startSession(req.user._id, req.body);
    successResponse(res, session, 'Interview session started', 201);
  } catch (error) {
    errorResponse(res, error.message, error.statusCode || 500);
  }
};

// @desc    Submit answer for a question
// @route   POST /api/interviews/:id/answer
const submitAnswer = async (req, res) => {
  try {
    const result = await interviewService.submitAnswer(req.user._id, req.params.id, req.body);
    successResponse(res, result, 'Answer submitted and evaluated');
  } catch (error) {
    errorResponse(res, error.message, error.statusCode || 500);
  }
};

// @desc    Complete interview session
// @route   POST /api/interviews/:id/complete
const completeInterview = async (req, res) => {
  try {
    const session = await interviewService.completeSession(req.user._id, req.params.id);
    successResponse(res, session, 'Interview completed');
  } catch (error) {
    errorResponse(res, error.message, error.statusCode || 500);
  }
};

// @desc    Get all interview sessions
// @route   GET /api/interviews
const getInterviews = async (req, res) => {
  try {
    const sessions = await interviewService.getUserSessions(req.user._id);
    successResponse(res, sessions, 'Sessions fetched');
  } catch (error) {
    errorResponse(res, error.message, 500);
  }
};

// @desc    Get single interview session
// @route   GET /api/interviews/:id
const getInterview = async (req, res) => {
  try {
    const session = await interviewService.getSessionById(req.params.id, req.user._id);
    successResponse(res, session, 'Session fetched');
  } catch (error) {
    errorResponse(res, error.message, error.statusCode || 500);
  }
};

module.exports = { startInterview, submitAnswer, completeInterview, getInterviews, getInterview };
