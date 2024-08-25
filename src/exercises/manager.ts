import {
  getFromCache,
  resetNamespaceCache,
  setToCache,
} from '../utils/cache.js';
import ExercisesRepository from './repository.js';

export default class ExercisesManager {
  static async createExercise(
    exercise: Partial<FsaType> | Partial<SpotreccType>
  ): Promise<FsaType | SpotreccType | null> {
    try {
      const response = await ExercisesRepository.createExercise(exercise);
      if (response === null) return response;
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

  static async getExerciseById(
    exerciseId: string
  ): Promise<ExerciseType | null> {
    try {
      const cachedExercise = await getFromCache('getExerciseById', exerciseId);
      if (cachedExercise) {
        console.log(
          'Cache hit: Exercise manager - getExerciseById',
          exerciseId
        );
        return JSON.parse(cachedExercise); // Parse cached JSON data
      }
      const exercise = await ExercisesRepository.getExerciseById(exerciseId);
      exercise !== null
        ? await setToCache(
            'getExerciseById',
            exerciseId,
            JSON.stringify(exercise),
            36000
          )
        : null;
      console.log('Exercise manager', exercise);
      return exercise;
    } catch (error: any) {
      console.error('Manager Error [getExerciseById]:', error.message);
      throw new Error('Error in getExerciseById');
    }
  }

  static async getAllExercise(): Promise<ExerciseType[]> {
    try {
      const cachedExercises = await getFromCache(
        'getAllExercise',
        'allExercises'
      );
      if (cachedExercises) {
        console.log(
          'Cache hit: Exercise manager - getAllExercise',
          cachedExercises
        );
        return JSON.parse(cachedExercises); // Parse cached JSON data
      }
      const exercises = await ExercisesRepository.getAllExercises();
      await setToCache(
        'getAllExercise',
        'allExercises',
        JSON.stringify(exercises),
        3600
      );
      return exercises;
    } catch (error: any) {
      console.error('Manager Error [getAllExercise]:', error.message);
      throw new Error('Error in getAllExercise');
    }
  }

  static async updateExercise(
    exerciseId: string,
    filedsToUpdate: Partial<FsaType> | Partial<SpotreccType>
  ): Promise<FsaType | SpotreccType | null> {
    try {
      const updatedExercise = await ExercisesRepository.updateExercise(
        exerciseId,
        filedsToUpdate
      );
      await setToCache(
        'exercises',
        exerciseId,
        JSON.stringify(updatedExercise),
        3600
      );
      await resetNamespaceCache('getAllExercise', 'allExercises');

      return updatedExercise;
    } catch (error: any) {
      console.error('Manager Error [updateExercise]:', error.message);
      throw new Error('Error in updateExercise');
    }
  }

  static async deleteExercise(
    exerciseId: string
  ): Promise<ExerciseType | null> {
    try {
      const status = await ExercisesRepository.deleteExercise(exerciseId);
      status ? await resetNamespaceCache('exercises', exerciseId) : null;
      await resetNamespaceCache('getAllExercise', 'allExercises');

      return status;
    } catch (error: any) {
      console.error('Manager Error [deleteExercise]:', error.message);
      throw new Error('Error in deleteExercise');
    }
  }

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
