const mongoose = require('mongoose');

const questionAnswerSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  questionType: {
    type: String,
    enum: ['technical', 'hr', 'project', 'behavioral'],
    required: true,
  },
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard'],
    default: 'medium',
  },
  answer: {
    type: String,
    default: '',
  },
  idealAnswer: {
    type: String,
    default: '',
  },
  feedback: {
    relevanceScore: { type: Number, default: 0 },
    completenessScore: { type: Number, default: 0 },
    technicalDepthScore: { type: Number, default: 0 },
    grammarScore: { type: Number, default: 0 },
    confidenceScore: { type: Number, default: 0 },
    overallScore: { type: Number, default: 0 },
    strengths: [{ type: String }],
    improvements: [{ type: String }],
    detailedFeedback: { type: String, default: '' },
  },
  isAnswered: {
    type: Boolean,
    default: false,
  },
  timeSpent: {
    type: Number, // seconds
    default: 0,
  },
});

const interviewSessionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    resume: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Resume',
    },
    jobDescription: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'JobDescription',
    },
    targetRole: {
      type: String,
      required: [true, 'Target role is required'],
    },
    difficulty: {
      type: String,
      enum: ['easy', 'medium', 'hard', 'mixed'],
      default: 'medium',
    },
    questions: [questionAnswerSchema],
    totalQuestions: {
      type: Number,
      default: 0,
    },
    answeredQuestions: {
      type: Number,
      default: 0,
    },
    overallScore: {
      type: Number,
      default: 0,
    },
    totalTimeSpent: {
      type: Number, // seconds
      default: 0,
    },
    status: {
      type: String,
      enum: ['in-progress', 'completed', 'abandoned'],
      default: 'in-progress',
    },
    summary: {
      strengths: [{ type: String }],
      weaknesses: [{ type: String }],
      recommendations: [{ type: String }],
      overallFeedback: { type: String, default: '' },
    },
  },
  {
    timestamps: true,
  }
);

interviewSessionSchema.index({ user: 1, createdAt: -1 });

module.exports = mongoose.model('InterviewSession', interviewSessionSchema);
