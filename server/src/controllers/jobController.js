const jobService = require('../services/jobService');
const { successResponse, errorResponse } = require('../utils/responseFormatter');

// @desc    Create job description
// @route   POST /api/jobs
const createJob = async (req, res) => {
  try {
    const job = await jobService.createJobDescription(req.user._id, req.body);
    successResponse(res, job, 'Job description created', 201);
  } catch (error) {
    errorResponse(res, error.message, error.statusCode || 500);
  }
};

// @desc    Match resume against job description
// @route   POST /api/jobs/:id/match
const matchJob = async (req, res) => {
  try {
    const { resumeId } = req.body;
    const result = await jobService.matchResumeToJob(req.user._id, req.params.id, resumeId);
    successResponse(res, result, 'Job matching completed');
  } catch (error) {
    errorResponse(res, error.message, error.statusCode || 500);
  }
};

// @desc    Get all job descriptions for user
// @route   GET /api/jobs
const getJobs = async (req, res) => {
  try {
    const jobs = await jobService.getUserJobDescriptions(req.user._id);
    successResponse(res, jobs, 'Job descriptions fetched');
  } catch (error) {
    errorResponse(res, error.message, 500);
  }
};

// @desc    Get single job description
// @route   GET /api/jobs/:id
const getJob = async (req, res) => {
  try {
    const job = await jobService.getJobDescriptionById(req.params.id, req.user._id);
    successResponse(res, job, 'Job description fetched');
  } catch (error) {
    errorResponse(res, error.message, error.statusCode || 500);
  }
};

// @desc    Delete job description
// @route   DELETE /api/jobs/:id
const deleteJob = async (req, res) => {
  try {
    const result = await jobService.deleteJobDescription(req.params.id, req.user._id);
    successResponse(res, result, 'Job description deleted');
  } catch (error) {
    errorResponse(res, error.message, error.statusCode || 500);
  }
};

module.exports = { createJob, matchJob, getJobs, getJob, deleteJob };
