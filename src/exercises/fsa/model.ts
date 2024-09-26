import { Schema } from 'mongoose';
import ExerciseModel from '../model.js';

const FsaSchema = new Schema<FsaType>({
  relevant: [
    {
      type: String,
      ref: 'Target',
    },
  ],

  // targetsList: [
  //   {
  //     type: String,
  //     ref: 'Target',
  //   },
  // ],
  // acceptableTargets: [
  //   {
  //     type: String,
  //     ref: 'Target',
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
    fileType: { type: FileTypes, required: true },
    objectName: { type: String, required: true },
  },
});

const FsaModel = ExerciseModel.discriminator('Fsa', FsaSchema);

export default FsaModel;
