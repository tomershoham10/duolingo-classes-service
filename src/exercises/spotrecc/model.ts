import { Schema } from 'mongoose';
import ExerciseModel from '../model.js';

const SpotreccSchema = new Schema<SpotreccType>({
  subExercises: {
    type: [
      {
        description: {
          type: String,
        },
        file: {
          type: String,
        },
        time: {
          type: Number,
        },
      },
    ],
    _id: false,
  },
});

const SpotreccModel = ExerciseModel.discriminator('Spotrecc', SpotreccSchema);

export default SpotreccModel;
