const InterviewSession = require('../models/InterviewSession');
const Resume = require('../models/Resume');
const Report = require('../models/Report');
const ActivityLog = require('../models/ActivityLog');
const pythonApiService = require('./pythonApiService');

const startSession = async (userId, { targetRole, difficulty, resumeId, jobDescriptionId }) => {
  let resumeData = null;

  if (resumeId) {
    const resume = await Resume.findOne({ _id: resumeId, user: userId });
    if (resume) {
      resumeData = {
        skills: resume.parsedData.skills,
        experience: resume.parsedData.experience,
        projects: resume.parsedData.projects,
      };
    }
  }

  // Generate questions via ML service
  const questionsData = await pythonApiService.generateInterviewQuestions(
    resumeData,
    targetRole,
    difficulty || 'medium'
  );

  const session = await InterviewSession.create({
    user: userId,
    resume: resumeId || undefined,
    jobDescription: jobDescriptionId || undefined,
    targetRole,
    difficulty: difficulty || 'medium',
    questions: questionsData.questions,
    totalQuestions: questionsData.questions.length,
    status: 'in-progress',
  });

  await ActivityLog.create({
    user: userId,
    action: 'interview-start',
    description: `Started mock interview for: ${targetRole}`,
    metadata: { sessionId: session._id },
  });

  return session;
};

const submitAnswer = async (userId, sessionId, { questionIndex, answer, timeSpent }) => {
  const session = await InterviewSession.findOne({
    _id: sessionId,
    user: userId,
    status: 'in-progress',
  });

  if (!session) {
    throw { statusCode: 404, message: 'Interview session not found or already completed' };
  }

  if (questionIndex >= session.questions.length) {
    throw { statusCode: 400, message: 'Invalid question index' };
  }

  const question = session.questions[questionIndex];

  // Evaluate answer via ML service
  const evaluation = await pythonApiService.evaluateAnswer(
    question.question,
    answer,
    question.idealAnswer,
    question.questionType
  );

  // Update question with answer and feedback
  session.questions[questionIndex].answer = answer;
  session.questions[questionIndex].isAnswered = true;
  session.questions[questionIndex].timeSpent = timeSpent || 0;
  session.questions[questionIndex].feedback = evaluation;

  session.answeredQuestions = session.questions.filter((q) => q.isAnswered).length;
  session.totalTimeSpent = session.questions.reduce((sum, q) => sum + (q.timeSpent || 0), 0);

  await session.save();

  return {
    feedback: evaluation,
    progress: {
      answered: session.answeredQuestions,
      total: session.totalQuestions,
    },
  };
};

const completeSession = async (userId, sessionId) => {
  const session = await InterviewSession.findOne({
    _id: sessionId,
    user: userId,
  });

  if (!session) {
    throw { statusCode: 404, message: 'Interview session not found' };
  }

  // Calculate overall score
  const answeredQuestions = session.questions.filter((q) => q.isAnswered);
  const avgScore =
    answeredQuestions.length > 0
      ? answeredQuestions.reduce((sum, q) => sum + (q.feedback.overallScore || 0), 0) /
        answeredQuestions.length
      : 0;

  session.overallScore = Math.round(avgScore);
  session.status = 'completed';

  // Generate summary
  const strengths = [];
  const weaknesses = [];
  answeredQuestions.forEach((q) => {
    if (q.feedback.overallScore >= 70) {
      strengths.push(`${q.questionType}: ${q.feedback.strengths?.[0] || 'Good answer'}`);
    } else {
      weaknesses.push(`${q.questionType}: ${q.feedback.improvements?.[0] || 'Needs improvement'}`);
    }
  });

  session.summary = {
    strengths: strengths.slice(0, 5),
    weaknesses: weaknesses.slice(0, 5),
    recommendations: [
      avgScore < 50 ? 'Focus on building foundational knowledge' : '',
      avgScore >= 50 && avgScore < 70 ? 'Practice more technical depth in answers' : '',
      avgScore >= 70 ? 'Great performance! Focus on edge cases and optimization' : '',
    ].filter(Boolean),
    overallFeedback: `You scored ${Math.round(avgScore)}% overall. ${
      avgScore >= 70
        ? 'Excellent preparation!'
        : avgScore >= 50
        ? 'Good effort. More practice will help.'
        : 'Keep practicing to improve your scores.'
    }`,
  };

  await session.save();

  // Create report
  await Report.create({
    user: userId,
    type: 'interview',
    title: `Interview: ${session.targetRole}`,
    interviewSession: session._id,
    resume: session.resume,
    data: {
      overallScore: session.overallScore,
      scores: {
        answered: session.answeredQuestions,
        total: session.totalQuestions,
      },
      findings: strengths,
      recommendations: session.summary.recommendations,
    },
  });

  await ActivityLog.create({
    user: userId,
    action: 'interview-complete',
    description: `Completed mock interview for: ${session.targetRole} with score ${session.overallScore}%`,
  });

  return session;
};

const getUserSessions = async (userId) => {
  return await InterviewSession.find({ user: userId })
    .sort({ createdAt: -1 })
    .select('-questions.idealAnswer');
};

const getSessionById = async (sessionId, userId) => {
  const session = await InterviewSession.findOne({ _id: sessionId, user: userId });
  if (!session) {
    throw { statusCode: 404, message: 'Session not found' };
  }
  return session;
};

module.exports = {
  startSession,
  submitAnswer,
  completeSession,
  getUserSessions,
  getSessionById,
};
