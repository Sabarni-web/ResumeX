const Resume = require('../models/Resume');
const ActivityLog = require('../models/ActivityLog');
const pythonApiService = require('./pythonApiService');
const { deleteFile } = require('../utils/fileCleanup');
const path = require('path');
const logger = require('../utils/logger');

const uploadAndParseResume = async (userId, file) => {
  const fileType = path.extname(file.originalname).replace('.', '').toLowerCase();

  // Create resume record
  const resume = await Resume.create({
    user: userId,
    fileName: file.filename,
    originalName: file.originalname,
    filePath: file.path,
    fileType,
    fileSize: file.size,
  });

  try {
    // Send to ML service for parsing
    const parsedData = await pythonApiService.parseResume(file.path, fileType);
    resume.parsedData = parsedData;

    // Get ATS score
    const atsResult = await pythonApiService.getATSScore(
      parsedData.fullText || '',
      parsedData.skills || []
    );
    resume.atsScore = atsResult;

    await resume.save();

    await ActivityLog.create({
      user: userId,
      action: 'resume-upload',
      description: `Uploaded and parsed resume: ${file.originalname}`,
      metadata: { resumeId: resume._id },
    });

    return resume;
  } catch (error) {
    // If ML parsing fails, still keep the uploaded file record
    logger.warn(`ML parsing failed for resume ${resume._id}: ${error.message}`);
    resume.parsedData = { fullText: '', skills: [], error: error.message };
    await resume.save();
    return resume;
  }
};

const getUserResumes = async (userId) => {
  return await Resume.find({ user: userId, isActive: true }).sort({ createdAt: -1 });
};

const getResumeById = async (resumeId, userId) => {
  const resume = await Resume.findOne({ _id: resumeId, user: userId });
  if (!resume) {
    throw { statusCode: 404, message: 'Resume not found' };
  }
  return resume;
};

const deleteResume = async (resumeId, userId) => {
  const resume = await Resume.findOne({ _id: resumeId, user: userId });
  if (!resume) {
    throw { statusCode: 404, message: 'Resume not found' };
  }

  // Delete file from disk
  deleteFile(resume.filePath);

  // Soft delete
  resume.isActive = false;
  await resume.save();

  await ActivityLog.create({
    user: userId,
    action: 'resume-delete',
    description: `Deleted resume: ${resume.originalName}`,
  });

  return { message: 'Resume deleted successfully' };
};

module.exports = {
  uploadAndParseResume,
  getUserResumes,
  getResumeById,
  deleteResume,
};
