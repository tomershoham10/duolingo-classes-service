import { Schema } from 'mongoose';
import ExerciseModel, { FileTypes } from '../model.js';

const SpotreccSchema = new Schema<SpotreccType>({
  subExercises: {
    type: [
      {
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
        exerciseTime: {
          type: Number,
          required: true,
        },
        bufferTime: {
          type: Number,
          required: true,
        },
      },
    ],
    _id: false,
  },
});

const SpotreccModel = ExerciseModel.discriminator('Spotrecc', SpotreccSchema);

export default SpotreccModel;
