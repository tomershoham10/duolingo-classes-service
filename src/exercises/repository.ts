import ResultsModel from '../results/model.js';
import FsaModel from './fsa/model.js';
import ExerciseModel from './model.js';
import SpotreccModel from './spotrecc/model.js';

enum ExercisesTypes {
  FSA = 'fsa',
  SPOTRECC = 'spotrecc',
}

export default class ExercisesRepository {
  static async createExercise(
    exercise: Partial<ExerciseType>
  ): Promise<FsaType | SpotreccType | null> {
    try {
      console.log('exercises repo create: ', exercise);
      if (exercise.type === ExercisesTypes.FSA) {
        const newExercise = await FsaModel.create(exercise);
        console.log('FSA newExercise: ', newExercise);

        return newExercise;
      }
      if (exercise.type === ExercisesTypes.SPOTRECC) {
        const newExercise = await SpotreccModel.create(exercise);
        console.log('SPOTRECC newExercise: ', newExercise);

        return newExercise;
      } else return null;
    } catch (error: any) {
      console.error('Repository Error:', error.message);
      throw new Error(`exercises repo - createExercise: ${error}`);
    }
  }

  static async getExerciseById(
    exerciseId: string
  ): Promise<ExerciseType | null> {
    try {
      const exercise = await ExerciseModel.findById(exerciseId);
      console.log('exercises repo', exerciseId);
      return exercise;
    } catch (error) {
      throw new Error(`exercises repo getExerciseById: ${error}`);
    }
  }

  static async getAllExercises(): Promise<(FsaType | SpotreccType)[]> {
    try {
      const exercises = (await ExerciseModel.find({})) as (
        | FsaType
        | SpotreccType
      )[];
      return exercises;
    } catch (error) {
      throw new Error(`exercises repo getAllExercises: ${error}`);
    }
  }

  static async updateExercise(
    exerciseId: string,
    fieldsToUpdate: Partial<FsaType> | Partial<SpotreccType>
  ): Promise<FsaType | SpotreccType | null> {
    try {
      console.log('exercises repo - updateExercise:', {
        exerciseId,
        ...fieldsToUpdate,
      });
      const exercise = await ExerciseModel.findById(exerciseId);
      if (!exercise) return null;
      if (exercise.type === ExercisesTypes.FSA) {
        const updatedExercise = await FsaModel.findByIdAndUpdate(
          exerciseId,
          fieldsToUpdate,
          { new: true }
        );
        console.log(
          'exercises repo - updateExercise - updatedExercise',
          updatedExercise
        );
        return updatedExercise;
      }
      if (exercise.type === ExercisesTypes.SPOTRECC) {
        const updatedExercise = await SpotreccModel.findByIdAndUpdate(
          exerciseId,
          fieldsToUpdate,
          { new: true }
        );
        console.log(
          'exercises repo - updateExercise - updatedExercise',
          updatedExercise
        );
        return updatedExercise;
      } else return null;
    } catch (error: any) {
      console.error('Repository Error:', error.message);
      throw new Error(`exercises repo - updateExercise: ${error}`);
    }
  }

  static async deleteExercise(
    exerciseId: string
  ): Promise<ExerciseType | null> {
    try {
      const status = await ExerciseModel.findOneAndDelete({ _id: exerciseId });
      return status;
    } catch (error: any) {
      console.error('Repository Error:', error.message);
      throw new Error(`exercises repo - deleteExercise: ${error}`);
    }
  }

  static async getResultByUserAndExerciseId(
    exerciseId: string,
    userId: string
  ): Promise<ResultType | null> {
    try {
      const exercise = await ExerciseModel.findById(exerciseId);
      console.log(
        'exercises repo getResultByUserAndExerciseId - exercise',
        exercise
      );
      if (exercise && userId) {
        const result = await ResultsModel.findOne({
          exerciseId: { $eq: exerciseId },
          userId: { $eq: userId },
        });
        console.log(
          'exercises repo getResultByUserAndExerciseId - result',
          result
        );
        return result;
      } else return null;
    } catch (error: any) {
      console.error('Repository Error:', error.message);
      throw new Error(
        `exercises repo - getResultByUserAndExerciseId: ${error}`
      );
    }
  }
}
