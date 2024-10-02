import { model, Schema } from 'mongoose';

enum ExercisesTypes {
  FSA = 'fsa',
  SPOTRECC = 'spotrecc',
}

export enum FileTypes {
  RECORDS = 'records',
  IMAGES = 'images',
}

const exerciseSchema = new Schema<ExerciseType>({
  type: {
    type: String,
    required: true,
    enum: Object.values(ExercisesTypes),
  },
  dateCreated: {
    type: Date,
    default: Date.now,
    required: true,
  },
  adminComments: {
    type: String,
    required: false,
  },
});

const ExerciseModel = model<ExerciseType>('Exercise', exerciseSchema);

export default ExerciseModel;
