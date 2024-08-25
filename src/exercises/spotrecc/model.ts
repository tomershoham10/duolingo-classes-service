import { Schema } from 'mongoose';
import ExerciseModel from '../model.js';

const SpotreccSchema = new Schema<SpotreccType>({
  subExercises: {
    type: [
      {
        description: {
          type: String,
          required: false,
        },
        fileName: {
          type: String,
          required: true,
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
