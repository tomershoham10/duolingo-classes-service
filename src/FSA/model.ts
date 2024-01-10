import mongoose, { Schema } from 'mongoose';

const FSASchema = new Schema<FSAType>({
  relevant: [{
    type: String,
    ref: 'Target',
    required: false
  }],
  answersList: [{
    type: String,
    ref: 'Target',
    required: true
  }],
  acceptableAnswers: [{
    type: String,
    ref: 'Target',
    required: false
  }],
  timeBuffers: {
    type: [{
      timeBuffer: {
        type: Number,
        required: true,
      },
      grade: {
        type: Number,
        required: true,
      },
    }],
    validate: {
      validator: (arr: any[]) => arr.length >= 2,
      message: 'timeBuffers must have at least 2 values',
    },
    required: true,
  },
  description: {
    type: String,
    required: true
  },
  dateCreated: {
    type: Date,
    default: Date.now
  },
  recordsKeys: [{
    type: String,
    ref: 'File',
    required: true
  }],
  sonolistKeys: [{
    type: String,
    ref: 'File',
    required: true
  }],
});

const FSAModel = mongoose.model<FSAType>('FSA', FSASchema);

export default FSAModel;
