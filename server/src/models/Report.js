const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    type: {
      type: String,
      enum: ['resume-analysis', 'job-match', 'interview', 'ats-check'],
      required: true,
    },
    title: {
      type: String,
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
    interviewSession: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'InterviewSession',
    },
    data: {
      overallScore: { type: Number, default: 0 },
      scores: { type: mongoose.Schema.Types.Mixed, default: {} },
      findings: [{ type: String }],
      recommendations: [{ type: String }],
      details: { type: mongoose.Schema.Types.Mixed, default: {} },
    },
  },
  {
    timestamps: true,
  }
);

reportSchema.index({ user: 1, type: 1, createdAt: -1 });

module.exports = mongoose.model('Report', reportSchema);
