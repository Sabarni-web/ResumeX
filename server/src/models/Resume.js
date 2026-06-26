const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    fileName: {
      type: String,
      required: true,
    },
    originalName: {
      type: String,
      required: true,
    },
    filePath: {
      type: String,
      required: true,
    },
    fileType: {
      type: String,
      enum: ['pdf', 'docx'],
      required: true,
    },
    fileSize: {
      type: Number,
      required: true,
    },
    parsedData: {
      fullText: { type: String, default: '' },
      name: { type: String, default: '' },
      email: { type: String, default: '' },
      phone: { type: String, default: '' },
      summary: { type: String, default: '' },
      skills: [{ type: String }],
      education: [
        {
          degree: String,
          institution: String,
          year: String,
          gpa: String,
        },
      ],
      experience: [
        {
          title: String,
          company: String,
          duration: String,
          description: String,
        },
      ],
      projects: [
        {
          name: String,
          description: String,
          technologies: [String],
        },
      ],
      certifications: [{ type: String }],
    },
    atsScore: {
      overall: { type: Number, default: 0 },
      formatting: { type: Number, default: 0 },
      keywordDensity: { type: Number, default: 0 },
      sectionCompleteness: { type: Number, default: 0 },
      readability: { type: Number, default: 0 },
      suggestions: [{ type: String }],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Index for faster queries
resumeSchema.index({ user: 1, createdAt: -1 });

module.exports = mongoose.model('Resume', resumeSchema);
