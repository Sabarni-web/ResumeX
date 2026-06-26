const JobDescription = require('../models/JobDescription');
const Resume = require('../models/Resume');
const Report = require('../models/Report');
const ActivityLog = require('../models/ActivityLog');
const pythonApiService = require('./pythonApiService');

const createJobDescription = async (userId, data) => {
  const jobDescription = await JobDescription.create({
    user: userId,
    ...data,
  });
  return jobDescription;
};

const matchResumeToJob = async (userId, jobDescriptionId, resumeId) => {
  const jobDescription = await JobDescription.findOne({
    _id: jobDescriptionId,
    user: userId,
  });
  if (!jobDescription) {
    throw { statusCode: 404, message: 'Job description not found' };
  }

  const resume = await Resume.findOne({ _id: resumeId, user: userId });
  if (!resume) {
    throw { statusCode: 404, message: 'Resume not found' };
  }

  // Send to ML service
  const matchResult = await pythonApiService.matchJobDescription(
    {
      skills: resume.parsedData.skills,
      experience: resume.parsedData.experience,
      projects: resume.parsedData.projects,
      education: resume.parsedData.education,
      fullText: resume.parsedData.fullText,
    },
    {
      title: jobDescription.title,
      description: jobDescription.description,
      requiredSkills: jobDescription.requiredSkills,
      preferredSkills: jobDescription.preferredSkills,
    }
  );

  // Update job description with match results
  jobDescription.matchResults = {
    resume: resumeId,
    ...matchResult,
  };
  await jobDescription.save();

  // Create report
  await Report.create({
    user: userId,
    type: 'job-match',
    title: `Job Match: ${jobDescription.title}`,
    resume: resumeId,
    jobDescription: jobDescriptionId,
    data: {
      overallScore: matchResult.overallScore,
      scores: {
        keywordMatch: matchResult.keywordMatchScore,
        semantic: matchResult.semanticScore,
      },
      findings: matchResult.matchedSkills,
      recommendations: matchResult.improvements,
    },
  });

  await ActivityLog.create({
    user: userId,
    action: 'job-match',
    description: `Matched resume against: ${jobDescription.title}`,
    metadata: { jobDescriptionId, resumeId },
  });

  return jobDescription;
};

const getUserJobDescriptions = async (userId) => {
  return await JobDescription.find({ user: userId }).sort({ createdAt: -1 });
};

const getJobDescriptionById = async (jobId, userId) => {
  const jd = await JobDescription.findOne({ _id: jobId, user: userId });
  if (!jd) {
    throw { statusCode: 404, message: 'Job description not found' };
  }
  return jd;
};

const deleteJobDescription = async (jobId, userId) => {
  const jd = await JobDescription.findOneAndDelete({ _id: jobId, user: userId });
  if (!jd) {
    throw { statusCode: 404, message: 'Job description not found' };
  }
  return { message: 'Job description deleted successfully' };
};

module.exports = {
  createJobDescription,
  matchResumeToJob,
  getUserJobDescriptions,
  getJobDescriptionById,
  deleteJobDescription,
};
