import { Schema } from 'mongoose';
import ExerciseModel, { FileTypes } from '../model.js';

const FsaSchema = new Schema<FsaType>({
  relevant: { type: String, ref: 'relevant' },

  // targetsList: [
  //   {
  //     type: String,
  //     ref: 'targets',
  //   },
  // ],
  // acceptableTargets: [
  //   {
  //     type: String,
  //     ref: 'targets',
  //   },
  // ],

  timeBuffers: {
    type: [
      {
        timeBuffer: {
          type: Number,
        },
        grade: {
          type: Number,
        },
      },
    ],
    _id: false,
    required: true,
  },

  description: {
    type: String,
    required: false,
  },
  fileRoute: {
    mainId: { type: String, required: true },
    subTypeId: { type: String, required: true },
    modelId: { type: String, required: true },
    fileType: { type: String, required: true, enum: Object.values(FileTypes) },
    objectName: { type: String, required: true },
  },
});

const FsaModel = ExerciseModel.discriminator('Fsa', FsaSchema);

export default FsaModel;
