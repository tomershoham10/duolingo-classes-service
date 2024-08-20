import { model, Schema } from 'mongoose';

enum ExercisesTypes {
  FSA = 'fsa',
  SPOTRECC = 'spotrecc',
}

const exerciseSchema = new Schema({
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
});

const ExerciseModel = model<ExerciseType>('Exercise', exerciseSchema);

export default ExerciseModel;
