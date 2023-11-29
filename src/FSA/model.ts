import mongoose, { Schema } from 'mongoose';

enum DifficultyLevel {
  Easy = 'Easy',
  Medium = 'Medium',
  Hard = 'Hard',
}

const FSASchema = new Schema<FSAType>({
  filesKeys: [{
    type: String,
    ref: 'File',
    required: true
  }],
  difficultyLevel: {
    type: String,
    enum: Object.values(DifficultyLevel),
    required: true
  },
  relevant: [{
    type: String,
    ref: 'Target',
    required: true
  }],
  answers: [{
    type: String,
    ref: 'Target',
    required: true
  }],
  firstTimeBuffer: {
    type: Number,
    required: true
  },
  secondTimeBuffer: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  dateCreated: {
    type: Date,
    default: Date.now
  },
  sonolistKeys: [{
    type: String,
    ref: 'File',
    required: true
  }],
});

const FSAModel = mongoose.model<FSAType>('FSA', FSASchema);

export default FSAModel;
