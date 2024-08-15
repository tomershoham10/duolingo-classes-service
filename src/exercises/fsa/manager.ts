import {
  getFromCache,
  resetNamespaceCache,
  setToCache,
} from '../../utils/cache.js';
import FsaRepository from './repository.js';

export default class FsaManager {
  static async createExercise(
    exercise: Partial<FsaType>
  ): Promise<FsaType> {
    try {
      const response = await FsaRepository.createExercise(exercise);
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

  static async getRelevantByExerciseId(
    exerciseId: string
  ): Promise<TargetType[] | null> {
    try {
      const cachedRelevant = await getFromCache(
        'getRelevantByExerciseId',
        exerciseId
      );
      if (cachedRelevant) {
        console.log(
          'Cache hit: exercises manager - getRelevantByExerciseId',
          exerciseId
        );
        return JSON.parse(cachedRelevant); // Parse cached JSON data
      }
      console.log(
        'Exercise manager getRelevantByExerciseId - exerciseId',
        exerciseId
      );
      const relevant =
        await FsaRepository.getRelevantByExerciseId(exerciseId);
      relevant !== null
        ? await setToCache(
            'getRelevantByExerciseId',
            exerciseId,
            JSON.stringify(relevant),
            36000
          )
        : null;

      console.log(
        'Exercise manager getRelevantByExerciseId - relevant targets',
        relevant
      );
      return relevant;
    } catch (error: any) {
      console.error('Manager Error [getRelevantByExerciseId]:', error.message);
      throw new Error('Error in getRelevantByExerciseId');
    }
  }

  static async getAnswersByExerciseId(
    exerciseId: string
  ): Promise<TargetType[] | FeatureObject[] | null> {
    try {
      const cachedTargets = await getFromCache(
        'getAnswersByExerciseId',
        exerciseId
      );
      if (cachedTargets) {
        console.log(
          'Cache hit: Exercise manager - getAnswersByExerciseId',
          exerciseId
        );
        return JSON.parse(cachedTargets); // Parse cached JSON data
      }
      console.log(
        'Exercise manager getAnswersByExerciseId - exerciseId',
        exerciseId
      );
      const targets =
        await FsaRepository.getAnswersByExerciseId(exerciseId);
      targets !== null
        ? await setToCache(
            'getAnswersByExerciseId',
            exerciseId,
            JSON.stringify(targets),
            36000
          )
        : null;

      console.log('Exercise manager getAnswersByExerciseId - targets', targets);
      return targets;
    } catch (error: any) {
      console.error('Manager Error [getAnswersByExerciseId]:', error.message);
      throw new Error('Error in getAnswersByExerciseId');
    }
  }

  static async getExerciseByTargetId(
    targetId: string
  ): Promise<FsaType[] | null> {
    try {
      const cachedExercises = await getFromCache(
        'getExerciseByTargetId',
        targetId
      );
      if (cachedExercises) {
        console.log(
          'Cache hit: Exercise manager - getExerciseByTargetId',
          targetId
        );
        return JSON.parse(cachedExercises); // Parse cached JSON data
      }
      const exercises =
        await FsaRepository.getExerciseByTargetId(targetId);
      exercises !== null
        ? await setToCache(
            'getExerciseByTargetId',
            targetId,
            JSON.stringify(exercises),
            360
          )
        : null;
      console.log('Exercise manager getExerciseByTargetId', exercises);
      return exercises;
    } catch (error: any) {
      console.error('Manager Error [getExerciseByTargetId]:', error.message);
      throw new Error('Error in getExerciseByTargetId');
    }
  }

  static async getExerciseById(
    exerciseId: string
  ): Promise<FsaType | null> {
    try {
      const cachedExercise = await getFromCache('getExerciseById', exerciseId);
      if (cachedExercise) {
        console.log(
          'Cache hit: Exercise manager - getExerciseById',
          exerciseId
        );
        return JSON.parse(cachedExercise); // Parse cached JSON data
      }
      const exercise = await FsaRepository.getExerciseById(exerciseId);
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

  static async getAllExercise(): Promise<FsaType[]> {
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
      const exercises = await FsaRepository.getAllExercises();
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
    filedsToUpdate: Partial<FsaType>
  ): Promise<FsaType | null> {
    try {
      const updatedExercise = await FsaRepository.updateExercise(
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
  ): Promise<FsaType | null> {
    try {
      const status = await FsaRepository.deleteExercise(exerciseId);
      status ? await resetNamespaceCache('exercises', exerciseId) : null;
      await resetNamespaceCache('getAllExercise', 'allExercises');

      return status;
    } catch (error: any) {
      console.error('Manager Error [deleteExercise]:', error.message);
      throw new Error('Error in deleteExercise');
    }
  }
}
