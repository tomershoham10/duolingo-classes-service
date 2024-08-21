import { getFromCache, setToCache } from '../../utils/cache.js';
import FsaRepository from './repository.js';

export default class FsaManager {
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
      const relevant = await FsaRepository.getRelevantByExerciseId(exerciseId);
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
  ): Promise<TargetType[] | null> {
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
      const targets = await FsaRepository.getAnswersByExerciseId(exerciseId);
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
      const exercises = await FsaRepository.getExerciseByTargetId(targetId);
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
}
