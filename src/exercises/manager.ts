import { getFromCache, setToCache } from '../utils/cache.js';
import ExercisesRepository from './repository.js';

export default class ExercisesManager {
  static async getResultByUserAndExerciseId(
    exerciseId: string,
    useId: string
  ): Promise<ResultType | undefined | null> {
    try {
      const cachedResult = await getFromCache(
        'getResultByUserAndExerciseId',
        exerciseId + useId
      );
      if (cachedResult) {
        console.log(
          'Cache hit: exercises manager - getResultByUserAndExerciseId',
          exerciseId,
          useId
        );
        return JSON.parse(cachedResult); // Parse cached JSON data
      }
      console.log(
        'exercises manager getResultByUserAndExerciseId - exerciseId',
        exerciseId
      );
      const result = await ExercisesRepository.getResultByUserAndExerciseId(
        exerciseId,
        useId
      );
      result !== null
        ? await setToCache(
            'getResultByUserAndExerciseId',
            exerciseId + useId,
            JSON.stringify(result),
            36000
          )
        : null;
      console.log(
        'exercises manager getResultByUserAndExerciseId - result',
        result
      );
      return result;
    } catch (error: any) {
      console.error(
        'Manager Error [getResultByUserAndExerciseId]:',
        error.message
      );
      throw new Error('Error in getResultByUserAndExerciseId');
    }
  }
}
