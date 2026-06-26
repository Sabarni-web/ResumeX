const Report = require('../models/Report');

const getUserReports = async (userId, { type, page = 1, limit = 10 }) => {
  const query = { user: userId };
  if (type) query.type = type;

  const total = await Report.countDocuments(query);
  const reports = await Report.find(query)
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(parseInt(limit))
    .populate('resume', 'originalName')
    .populate('jobDescription', 'title company')
    .populate('interviewSession', 'targetRole overallScore');

  return { reports, total, page, limit };
};

const getReportById = async (reportId, userId) => {
  const report = await Report.findOne({ _id: reportId, user: userId })
    .populate('resume', 'originalName parsedData atsScore')
    .populate('jobDescription', 'title company description matchResults')
    .populate('interviewSession');

  if (!report) {
    throw { statusCode: 404, message: 'Report not found' };
  }
  return report;
};

const deleteReport = async (reportId, userId) => {
  const report = await Report.findOneAndDelete({ _id: reportId, user: userId });
  if (!report) {
    throw { statusCode: 404, message: 'Report not found' };
  }
  return { message: 'Report deleted successfully' };
};

const getDashboardStats = async (userId) => {
  const [
    totalResumes,
    totalJobMatches,
    totalInterviews,
    recentReports,
  ] = await Promise.all([
    Report.countDocuments({ user: userId, type: 'resume-analysis' }),
    Report.countDocuments({ user: userId, type: 'job-match' }),
    Report.countDocuments({ user: userId, type: 'interview' }),
    Report.find({ user: userId })
      .sort({ createdAt: -1 })
      .limit(5)
      .populate('resume', 'originalName')
      .populate('jobDescription', 'title'),
  ]);

  // Get average scores
  const jobMatchReports = await Report.find({
    user: userId,
    type: 'job-match',
  }).select('data.overallScore createdAt');

  const interviewReports = await Report.find({
    user: userId,
    type: 'interview',
  }).select('data.overallScore createdAt');

  const avgJobMatchScore =
    jobMatchReports.length > 0
      ? Math.round(
          jobMatchReports.reduce((sum, r) => sum + (r.data.overallScore || 0), 0) /
            jobMatchReports.length
        )
      : 0;

  const avgInterviewScore =
    interviewReports.length > 0
      ? Math.round(
          interviewReports.reduce((sum, r) => sum + (r.data.overallScore || 0), 0) /
            interviewReports.length
        )
      : 0;

  return {
    totalResumes,
    totalJobMatches,
    totalInterviews,
    avgJobMatchScore,
    avgInterviewScore,
    recentReports,
    matchTrend: jobMatchReports.map((r) => ({
      score: r.data.overallScore,
      date: r.createdAt,
    })),
    interviewTrend: interviewReports.map((r) => ({
      score: r.data.overallScore,
      date: r.createdAt,
    })),
  };
};

module.exports = {
  getUserReports,
  getReportById,
  deleteReport,
  getDashboardStats,
};
