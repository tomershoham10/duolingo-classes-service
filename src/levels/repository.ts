import ExerciseModel from '../exercises/model.js';
// import CoursesController from "../courses/controller.js";
import CoursesManager from '../courses/manager.js';
import LevelsModel from './model.js';

export default class LevelsRepository {
  static async createLevel(level: Partial<LevelsType>): Promise<LevelsType> {
    try {
      const newlevel = await LevelsModel.create(level);
      return newlevel;
    } catch (error: any) {
      console.error('Repository Error:', error.message);
      throw new Error(`Level repo - createLevel: ${error}`);
    }
  }

  static async getLevelById(levelId: string): Promise<LevelsType | null> {
    try {
      const level = await LevelsModel.findById(levelId);
      console.log('levels repo', levelId);
      return level;
    } catch (error: any) {
      console.error('Repository Error:', error.message);
      throw new Error(`Level repo - getLevelById: ${error}`);
    }
  }

  static async getsExercisesByLevelId(levelId: string): Promise<ExerciseType[]> {
    try {
      const level = await LevelsModel.findById(levelId);
      if (level) {
        const exercisesIds = level.exercisesIds;
        if (exercisesIds.length > 0) {
          const exercisesDetails = await ExerciseModel.find({
            _id: { $in: exercisesIds },
          });
          return exercisesDetails;
        } else return [];
      } else return [];
    } catch (error: any) {
      console.error('Repository Error:', error.message);
      throw new Error(`Level repo - getsExercisesByLevelId: ${error}`);
    }
  }

  static async getsUnsuspendedExercisesByLevelId(
    levelId: string
  ): Promise<ExerciseType[]> {
    try {
      const level = await LevelsModel.findById(levelId);
      if (level) {
        const exercisesIds = level.exercisesIds;
        const unSuspendExercisesIds = exercisesIds.filter(
          (exerciseId) => !level.suspendedExercisesIds.includes(exerciseId)
        );

        if (unSuspendExercisesIds.length > 0) {
          const exercisesDetails = await ExerciseModel.find({
            _id: { $in: unSuspendExercisesIds },
          });

          return exercisesDetails;
        } else return [];
      } else return [];
    } catch (error: any) {
      console.error('Repository Error:', error.message);
      throw new Error(`Level repo - getsUnsuspendedExercisesByLevelId: ${error}`);
    }
  }

  static async getNextExerciseId(prevExerciseId: string): Promise<string | null> {
    try {
      const level = await LevelsModel.findOne({
        exercisesIds: { $in: [prevExerciseId] },
      });
      console.log('getNextExerciseId repo - level', level);
      if (level) {
        const exercisesIds = level.exercisesIds;
        if (exercisesIds) {
          const prevExerciseIdIndex = exercisesIds.indexOf(prevExerciseId);
          if (
            prevExerciseIdIndex !== -1 &&
            prevExerciseIdIndex + 1 !== exercisesIds.length
          ) {
            const nextExerciseId =
              exercisesIds[exercisesIds.indexOf(prevExerciseId) + 1];
            if (level.suspendedExercisesIds.includes(nextExerciseId)) {
              await this.getNextExerciseId(nextExerciseId);
            }
            return nextExerciseId;
          } else {
            const response = await CoursesManager.getNextLevelId(level._id);
            //returns the next level's id

            if (response) {
              if (response === 'finished') {
                return response;
              }
              const nextLevel = await LevelsModel.findById(response);
              if (nextLevel) {
                const nextExerciseId = nextLevel.exercisesIds[0];
                if (nextLevel.suspendedExercisesIds.includes(nextExerciseId)) {
                  await this.getNextExerciseId(nextExerciseId);
                }
                return nextExerciseId;
              } else return null;
            } else return null;
          }
        } else return null;
      } else return null;
    } catch (error: any) {
      console.error('Repository Error:', error.message);
      throw new Error(`Level repo - getNextExerciseId: ${error}`);
    }
  }

  static async getAllLevels(): Promise<LevelsType[]> {
    try {
      const levels = await LevelsModel.find({});
      console.log('repo getAllLevels', levels);
      return levels;
    } catch (error: any) {
      console.error('Repository Error:', error.message);
      throw new Error(`Level repo - getAllLevels: ${error}`);
    }
  }

  static async updateLevel(
    levelId: string,
    fieldsToUpdate: Partial<LevelsType>
  ): Promise<LevelsType | null> {
    try {
      const updatedLevel = await LevelsModel.findByIdAndUpdate(
        levelId,
        fieldsToUpdate,
        { new: true }
      );
      console.log('levels repo updateLevel', updatedLevel);
      return updatedLevel;
    } catch (error: any) {
      console.error('Repository Error:', error.message);
      throw new Error(`Level repo - updateLevel: ${error}`);
    }
  }

  static async suspendExerciseById(
    levelId: string,
    exerciseId: string
  ): Promise<LevelsType | null> {
    try {
      const level = await LevelsModel.findById(levelId);
      if (!level) {
        return null;
      }

      const suspendedExercisesIds = level.suspendedExercisesIds;
      if (suspendedExercisesIds.includes(exerciseId)) {
        return null;
      }

      const updatedLevel = await LevelsModel.findByIdAndUpdate(
        levelId,
        { suspendedExercisesIds: [...suspendedExercisesIds, exerciseId] },
        { new: true }
      );
      console.log('levels repo suspendExerciseById', updatedLevel);
      return updatedLevel;
    } catch (error: any) {
      console.error('Repository Error:', error.message);
      throw new Error(`Level repo - suspendExerciseById: ${error}`);
    }
  }

  static async unsuspendExerciseById(
    levelId: string,
    exerciseId: string
  ): Promise<LevelsType | null> {
    try {
      const level = await LevelsModel.findById(levelId);
      if (!level) {
        return null;
      }

      const suspendedExercisesIds = level.suspendedExercisesIds;
      if (!suspendedExercisesIds.includes(exerciseId)) {
        return null;
      }

      const updatedLevel = await LevelsModel.findByIdAndUpdate(
        levelId,
        {
          suspendedExercisesIds: suspendedExercisesIds.filter(
            (id) => id !== exerciseId
          ),
        },
        { new: true }
      );
      console.log('lessons repo unsuspendExerciseById', updatedLevel);
      return updatedLevel;
    } catch (error: any) {
      console.error('Repository Error:', error.message);
      throw new Error(`Level repo - unsuspendExerciseById: ${error}`);
    }
  }

  static async deleteLevel(levelId: string): Promise<LevelsType | null> {
    try {
      const deletedLevel = await LevelsModel.findByIdAndDelete(levelId);
      return deletedLevel;
    } catch (error: any) {
      console.error('Repository Error:', error.message);
      throw new Error(`Level repo - deleteLevel: ${error}`);
    }
  }
}
