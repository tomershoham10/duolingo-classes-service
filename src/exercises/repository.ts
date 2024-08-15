import ResultsModel from '../results/model.js';
import ExerciseModel from './model.js';

export default class ExercisesRepository {
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
