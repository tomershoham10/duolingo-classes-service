import { model, Schema } from 'mongoose';

const LevelSchema = new Schema<LevelsType>({
  exercisesIds: [
    {
      type: String,
      ref: 'exercises',
      required: true,
    },
  ],
  suspendedExercisesIds: [
    {
      type: String,
      ref: 'exercises',
      required: true,
    },
  ],
});

const LevelsModel = model<LevelsType>('levels', LevelSchema);

export default LevelsModel;
