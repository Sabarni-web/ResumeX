const resumeService = require('../services/resumeService');
const { successResponse, errorResponse } = require('../utils/responseFormatter');

// @desc    Upload and parse resume
// @route   POST /api/resumes/upload
const uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return errorResponse(res, 'Please upload a resume file (PDF or DOCX)', 400);
    }
    const resume = await resumeService.uploadAndParseResume(req.user._id, req.file);
    successResponse(res, resume, 'Resume uploaded and parsed successfully', 201);
  } catch (error) {
    errorResponse(res, error.message, error.statusCode || 500);
  }
};

// @desc    Get all resumes for user
// @route   GET /api/resumes
const getResumes = async (req, res) => {
  try {
    const resumes = await resumeService.getUserResumes(req.user._id);
    successResponse(res, resumes, 'Resumes fetched');
  } catch (error) {
    errorResponse(res, error.message, 500);
  }
};

// @desc    Get single resume details
// @route   GET /api/resumes/:id
const getResume = async (req, res) => {
  try {
    const resume = await resumeService.getResumeById(req.params.id, req.user._id);
    successResponse(res, resume, 'Resume fetched');
  } catch (error) {
    errorResponse(res, error.message, error.statusCode || 500);
  }
};

// @desc    Delete resume
// @route   DELETE /api/resumes/:id
const deleteResume = async (req, res) => {
  try {
    const result = await resumeService.deleteResume(req.params.id, req.user._id);
    successResponse(res, result, 'Resume deleted');
  } catch (error) {
    errorResponse(res, error.message, error.statusCode || 500);
  }
};

module.exports = { uploadResume, getResumes, getResume, deleteResume };
