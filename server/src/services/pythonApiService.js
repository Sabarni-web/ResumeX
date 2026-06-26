const axios = require('axios');
const { ML_SERVICE_URL } = require('../config/env');
const logger = require('../utils/logger');

const mlApi = axios.create({
  baseURL: ML_SERVICE_URL,
  timeout: 120000, // 2 minutes for ML processing
  headers: {
    'Content-Type': 'application/json',
  },
});

const parseResume = async (filePath, fileType) => {
  try {
    const response = await mlApi.post('/api/resume/parse', {
      file_path: filePath,
      file_type: fileType,
    });
    return response.data;
  } catch (error) {
    logger.error(`ML Service - Parse Resume Error: ${error.message}`);
    throw new Error('Failed to parse resume. ML service may be unavailable.');
  }
};

const getATSScore = async (resumeText, skills) => {
  try {
    const response = await mlApi.post('/api/ats/score', {
      resume_text: resumeText,
      skills: skills,
    });
    return response.data;
  } catch (error) {
    logger.error(`ML Service - ATS Score Error: ${error.message}`);
    throw new Error('Failed to calculate ATS score.');
  }
};

const matchJobDescription = async (resumeData, jobDescription) => {
  try {
    const response = await mlApi.post('/api/job/match', {
      resume_data: resumeData,
      job_description: jobDescription,
    });
    return response.data;
  } catch (error) {
    logger.error(`ML Service - Job Match Error: ${error.message}`);
    throw new Error('Failed to match job description.');
  }
};

const generateInterviewQuestions = async (resumeData, targetRole, difficulty) => {
  try {
    const response = await mlApi.post('/api/interview/generate-questions', {
      resume_data: resumeData,
      target_role: targetRole,
      difficulty: difficulty,
    });
    return response.data;
  } catch (error) {
    logger.error(`ML Service - Generate Questions Error: ${error.message}`);
    throw new Error('Failed to generate interview questions.');
  }
};

const evaluateAnswer = async (question, answer, idealAnswer, questionType) => {
  try {
    const response = await mlApi.post('/api/interview/evaluate-answer', {
      question: question,
      answer: answer,
      ideal_answer: idealAnswer,
      question_type: questionType,
    });
    return response.data;
  } catch (error) {
    logger.error(`ML Service - Evaluate Answer Error: ${error.message}`);
    throw new Error('Failed to evaluate answer.');
  }
};

const checkHealth = async () => {
  try {
    const response = await mlApi.get('/health');
    return response.data;
  } catch (error) {
    logger.error(`ML Service - Health Check Error: ${error.message}`);
    return { status: 'unavailable', error: error.message };
  }
};

module.exports = {
  parseResume,
  getATSScore,
  matchJobDescription,
  generateInterviewQuestions,
  evaluateAnswer,
  checkHealth,
};
