const mongoose = require('mongoose');

const EvaluationSchema = new mongoose.Schema({
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: true
  },
  evaluator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  grades: {
    uiUx: {
      type: Number,
      required: true,
      min: 1,
      max: 10
    },
    codeArchitecture: {
      type: Number,
      required: true,
      min: 1,
      max: 10
    },
    databaseEfficiency: {
      type: Number,
      required: true,
      min: 1,
      max: 10
    },
    innovation: {
      type: Number,
      required: true,
      min: 1,
      max: 10
    }
  },
  averageGrade: {
    type: Number,
    required: true
  },
  feedback: {
    type: String,
    required: true,
    trim: true
  }
}, {
  timestamps: true
});

// Calculate average grade before validation
EvaluationSchema.pre('validate', function(next) {
  if (this.grades) {
    const { uiUx, codeArchitecture, databaseEfficiency, innovation } = this.grades;
    this.averageGrade = parseFloat(((uiUx + codeArchitecture + databaseEfficiency + innovation) / 4).toFixed(2));
  }
  next();
});

module.exports = mongoose.model('Evaluation', EvaluationSchema);
