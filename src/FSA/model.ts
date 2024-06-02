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
    required: true,
    _id: false
  },
  description: {
    type: String,
    required: false
  },
  dateCreated: {
    type: Date,
    default: Date.now
  },
  recordName: {
    type: String,
    ref: 'File',
    required: true
  },
});

const FSAModel = mongoose.model<FSAType>('FSA', FSASchema);

export default FSAModel;
