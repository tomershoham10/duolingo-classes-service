import { resetNamespaceCache, setToCache } from '../../utils/cache.js';
import SpotreccRepository from './repository.js';

export default class SpotreccManager {
  static async createExercise(
    exercise: Partial<ExerciseType>
  ): Promise<ExerciseType> {
    try {
      const response = await SpotreccRepository.createExercise(exercise);
      await setToCache(
        'exercises',
        response._id,
        JSON.stringify(response),
        3600
      );
      await resetNamespaceCache('getAllExercises', 'allExercises');

      return response;
    } catch (error: any) {
      console.error('Manager Error [createExercise]:', error.message);
      throw new Error('Error in createExercise');
    }
  }
}
