const mongoose = require('mongoose');

const ChecklistItemSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true
  },
  checked: {
    type: Boolean,
    default: false
  }
});

const MilestoneSchema = new mongoose.Schema({
  phase: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const ProjectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  teamMembers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  techStack: {
    type: [String],
    default: []
  },
  progressPercentage: {
    type: Number,
    min: 0,
    max: 100,
    default: 0
  },
  checklist: [ChecklistItemSchema],
  timeline: [MilestoneSchema],
  liveDemoUrl: {
    type: String,
    default: ''
  },
  codebaseUrl: {
    type: String,
    default: ''
  },
  videoUrl: {
    type: String,
    default: ''
  },
  imageUrl: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Project', ProjectSchema);
