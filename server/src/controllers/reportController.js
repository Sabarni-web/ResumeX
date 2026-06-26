const reportService = require('../services/reportService');
const { successResponse, errorResponse, paginatedResponse } = require('../utils/responseFormatter');

// @desc    Get all reports for user
// @route   GET /api/reports
const getReports = async (req, res) => {
  try {
    const { type, page = 1, limit = 10 } = req.query;
    const result = await reportService.getUserReports(req.user._id, { type, page, limit });
    paginatedResponse(res, result.reports, result.page, result.limit, result.total);
  } catch (error) {
    errorResponse(res, error.message, 500);
  }
};

// @desc    Get single report
// @route   GET /api/reports/:id
const getReport = async (req, res) => {
  try {
    const report = await reportService.getReportById(req.params.id, req.user._id);
    successResponse(res, report, 'Report fetched');
  } catch (error) {
    errorResponse(res, error.message, error.statusCode || 500);
  }
};

// @desc    Delete report
// @route   DELETE /api/reports/:id
const deleteReport = async (req, res) => {
  try {
    const result = await reportService.deleteReport(req.params.id, req.user._id);
    successResponse(res, result, 'Report deleted');
  } catch (error) {
    errorResponse(res, error.message, error.statusCode || 500);
  }
};

// @desc    Get dashboard stats
// @route   GET /api/reports/dashboard
const getDashboard = async (req, res) => {
  try {
    const stats = await reportService.getDashboardStats(req.user._id);
    successResponse(res, stats, 'Dashboard stats fetched');
  } catch (error) {
    errorResponse(res, error.message, 500);
  }
};

module.exports = { getReports, getReport, deleteReport, getDashboard };
