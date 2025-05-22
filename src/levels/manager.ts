import { startSession } from 'mongoose';
import LevelsRepository from './repository.js';
import ExercisesModel from '../exercises/model.js';
import {
  getFromCache,
  resetNamespaceCache,
  setToCache,
} from '../utils/cache.js';

export default class LevelsManager {
  static async createLevel(): Promise<LevelsType> {
    const session = await startSession();
    session.startTransaction();
    try {
      // Create an empty level without initial exercises
      const createdLevel = await LevelsRepository.createLevel({
        exercisesIds: [],
        suspendedExercisesIds: []
      });
      
      await setToCache(
        'levels',
        createdLevel._id,
        JSON.stringify(createdLevel),
        3600
      );
      await resetNamespaceCache('getAllLevels', 'allLevels');

      await session.commitTransaction();
      return createdLevel;
    } catch (error: any) {
      await session.abortTransaction();
      console.error('Manager Error [createLevel]:', error.message);
      throw new Error('Error in level creation process');
    } finally {
      session.endSession();
    }
  }

  static async getLevelById(levelId: string): Promise<LevelsType | null> {
    try {
      const level = await LevelsRepository.getLevelById(levelId);
      console.log('levels manager', level);
      return level;
    } catch (error: any) {
      console.error('Manager Error [getLevelById]:', error.message);
      throw new Error('Error in getLevelById');
    }
  }

  static async getsExercisesByLevelId(levelId: string): Promise<ExerciseType[]> {
    try {
      const cachedExercises = await getFromCache('getsExercisesByLevelId', levelId);
      if (cachedExercises) {
        console.log(
          'Cache hit: levels manager - getsExercisesByLevelId',
          levelId
        );
        return JSON.parse(cachedExercises); // Parse cached JSON data
      }

      const exercises = await LevelsRepository.getsExercisesByLevelId(levelId);
      exercises !== null
        ? await setToCache(
            'getsExercisesByLevelId',
            levelId,
            JSON.stringify(exercises),
            3600
          )
        : null;

      console.log('levels manager getsExercisesByLevelId', exercises);
      return exercises;
    } catch (error: any) {
      console.error('Manager Error [getsExercisesByLevelId]:', error.message);
      throw new Error('Error in getsExercisesByLevelId');
    }
  }

  static async getsUnsuspendedExercisesByLevelId(
    levelId: string
  ): Promise<ExerciseType[]> {
    try {
      const cachedExercises = await getFromCache(
        'getsUnsuspendedExercisesByLevelId',
        levelId
      );
      if (cachedExercises) {
        console.log(
          'Cache hit: levels manager - getsUnsuspendedExercisesByLevelId',
          levelId
        );
        return JSON.parse(cachedExercises); // Parse cached JSON data
      }
      const exercises =
        await LevelsRepository.getsUnsuspendedExercisesByLevelId(levelId);
      exercises !== null
        ? await setToCache(
            'getsUnsuspendedExercisesByLevelId',
            levelId,
            JSON.stringify(exercises),
            3600
          )
        : null;
      console.log('levels manager getsUnsuspendedExercisesByLevelId', exercises);
      return exercises;
    } catch (error: any) {
      console.error(
        'Manager Error [getsUnsuspendedExercisesByLevelId]:',
        error.message
      );
      throw new Error('Error in getsUnsuspendedExercisesByLevelId');
    }
  }

  static async getNextExerciseId(prevExerciseId: string): Promise<string | null> {
    try {
      const cachedExercise = await getFromCache('getNextExerciseId', prevExerciseId);
      if (cachedExercise) {
        console.log(
          'Cache hit: levels manager - getNextExerciseId',
          prevExerciseId
        );
        return JSON.parse(cachedExercise); // Parse cached JSON data
      }
      const nextExerciseId = await LevelsRepository.getNextExerciseId(prevExerciseId);
      await setToCache(
        'getNextExerciseId',
        prevExerciseId,
        JSON.stringify(nextExerciseId),
        3600
      );
      console.log('levels manager getNextExerciseId', nextExerciseId, prevExerciseId);
      return nextExerciseId;
    } catch (error: any) {
      console.error('Manager Error [getNextExerciseId]:', error.message);
      throw new Error('Error in getNextExerciseId');
    }
  }

  static async getAllLevels(): Promise<LevelsType[]> {
    try {
      const cachedLevels = await getFromCache('getAllLevels', 'allLevels');
      if (cachedLevels) {
        console.log('Cache hit: levels manager - getAllLevels', cachedLevels);
        return JSON.parse(cachedLevels); // Parse cached JSON data
      }

      const levels = await LevelsRepository.getAllLevels();
      await setToCache(
        'getAllLevels',
        'allLevels',
        JSON.stringify(levels),
        3600
      );

      return levels;
    } catch (error: any) {
      console.error('Manager Error [getAllLevels]:', error.message);
      throw new Error('Error in getAllLevels');
    }
  }

  static async updateLevel(
    levelId: string,
    filedsToUpdate: Partial<LevelsType>
  ): Promise<LevelsType | null> {
    try {
      const updatedLevel = await LevelsRepository.updateLevel(
        levelId,
        filedsToUpdate
      );
      await setToCache('levels', levelId, JSON.stringify(updatedLevel), 3600);
      await resetNamespaceCache('getAllLevels', 'allLevels');

      return updatedLevel;
    } catch (error: any) {
      console.error('Manager Error [updateLevel]:', error.message);
      throw new Error('Error in updateLevel');
    }
  }

  static async suspendExerciseById(
    levelId: string,
    exerciseId: string
  ): Promise<LevelsType | null> {
    try {
      const updatedLevel = await LevelsRepository.suspendExerciseById(
        levelId,
        exerciseId
      );
      await setToCache('levels', levelId, JSON.stringify(updatedLevel), 3600);
      await resetNamespaceCache('getAllLevels', 'allLevels');
      await resetNamespaceCache('getsExercisesByLevelId', levelId);
      await resetNamespaceCache('getsUnsuspendedExercisesByLevelId', levelId);

      return updatedLevel;
    } catch (error: any) {
      console.error('Manager Error [suspendExerciseById]:', error.message);
      throw new Error('Error in suspendExerciseById');
    }
  }

  static async unsuspendExerciseById(
    levelId: string,
    exerciseId: string
  ): Promise<LevelsType | null> {
    try {
      const updatedLevel = await LevelsRepository.unsuspendExerciseById(
        levelId,
        exerciseId
      );
      await setToCache('levels', levelId, JSON.stringify(updatedLevel), 3600);
      await resetNamespaceCache('getAllLevels', 'allLevels');
      await resetNamespaceCache('getsExercisesByLevelId', levelId);
      await resetNamespaceCache('getsUnsuspendedExercisesByLevelId', levelId);

      return updatedLevel;
    } catch (error: any) {
      console.error('Manager Error [unsuspendExerciseById]:', error.message);
      throw new Error('Error in unsuspendExerciseById');
    }
  }

  static async deleteLevel(levelId: string): Promise<LevelsType | null> {
    try {
      const deletedLevel = await LevelsRepository.deleteLevel(levelId);
      
      await resetNamespaceCache('levels', levelId);
      await resetNamespaceCache('getAllLevels', 'allLevels');
      
      return deletedLevel;
    } catch (error: any) {
      console.error('Manager Error [deleteLevel]:', error.message);
      throw new Error('Error in deleteLevel');
    }
  }
}
