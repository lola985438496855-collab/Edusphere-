const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['Student', 'Evaluator', 'Engineer'],
    default: 'Student'
  },
  // Student-specific fields
  studentId: {
    type: String,
    sparse: true,
    trim: true
  },
  major: {
    type: String,
    trim: true
  },
  skills: {
    type: [String],
    default: []
  },
  avatar: {
    type: String,
    default: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'
  },
  status: {
    type: String,
    enum: ['Available', 'Busy'],
    default: 'Available'
  },
  bio: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('User', UserSchema);
