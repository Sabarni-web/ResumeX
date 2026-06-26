const mongoose = require('mongoose');

const jobDescriptionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: [true, 'Job title is required'],
      trim: true,
    },
    company: {
      type: String,
      trim: true,
      default: '',
    },
    description: {
      type: String,
      required: [true, 'Job description is required'],
    },
    requiredSkills: [{ type: String }],
    preferredSkills: [{ type: String }],
    experienceRequired: {
      type: String,
      default: '',
    },
    roleType: {
      type: String,
      enum: ['frontend', 'backend', 'fullstack', 'data', 'devops', 'mobile', 'ml', 'other'],
      default: 'other',
    },
    matchResults: {
      resume: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Resume',
      },
      overallScore: { type: Number, default: 0 },
      keywordMatchScore: { type: Number, default: 0 },
      semanticScore: { type: Number, default: 0 },
      matchedSkills: [{ type: String }],
      missingSkills: [{ type: String }],
      strengthAreas: [{ type: String }],
      improvements: [{ type: String }],
    },
  },
  {
    timestamps: true,
  }
);

jobDescriptionSchema.index({ user: 1, createdAt: -1 });

module.exports = mongoose.model('JobDescription', jobDescriptionSchema);
