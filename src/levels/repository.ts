import LessonsModel from '../lessons/model.js';
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

  static async getsLessonsByLevelId(levelId: string): Promise<LessonsType[]> {
    try {
      const level = await LevelsModel.findById(levelId);
      if (level) {
        const lessonsIds = level.lessonsIds;
        if (lessonsIds.length > 0) {
          const lessonsDetails = await LessonsModel.find({
            _id: { $in: lessonsIds },
          });
          // const lessonsInOrder = lessonsDetails.sort((a, b) => {
          //     const aIndex = lessonsIds.indexOf(a._id);
          //     const bIndex = lessonsIds.indexOf(b._id);
          //     return aIndex - bIndex;
          // });

          // console.log("levels repo getsLessonsByLevelId", levelId);
          return lessonsDetails;
        } else return [];
      } else return [];
    } catch (error: any) {
      console.error('Repository Error:', error.message);
      throw new Error(`Level repo - getsLessonsByLevelId: ${error}`);
    }
  }

  static async getsUnsuspendedLessonsByLevelId(
    levelId: string
  ): Promise<LessonsType[]> {
    try {
      const level = await LevelsModel.findById(levelId);
      if (level) {
        const lessonsIds = level.lessonsIds;
        const unSuspendLessonsIds = lessonsIds.filter(
          (lessonId) => !level.suspendedLessonsIds.includes(lessonId)
        );

        if (unSuspendLessonsIds.length > 0) {
          // const lessonsInOrder = lessonsIds.map((id: any) => lessonsDetails.find(lesson => lesson._id === id));
          const lessonsDetails = await LessonsModel.find({
            _id: { $in: unSuspendLessonsIds },
          });

          // console.log("levels repo getsLessonsByLevelId", levelId);
          return lessonsDetails;
        } else return [];
      } else return [];
    } catch (error: any) {
      console.error('Repository Error:', error.message);
      throw new Error(`Level repo - getsLessonsByLevelId: ${error}`);
    }
  }

  static async getNextLessonId(prevLessonId: string): Promise<string | null> {
    try {
      const level = await LevelsModel.findOne({
        lessons: { $in: [prevLessonId] },
      });
      console.log('getNextLessonId repo - level', level);
      if (level) {
        const lessonsIds = level.lessonsIds;
        if (lessonsIds) {
          const prevLessonIdIndex = lessonsIds.indexOf(prevLessonId);
          if (
            prevLessonIdIndex !== -1 &&
            prevLessonIdIndex + 1 !== lessonsIds.length
          ) {
            const nextLessonId =
              lessonsIds[lessonsIds.indexOf(prevLessonId) + 1];
            if (level.suspendedLessonsIds.includes(nextLessonId)) {
              await this.getNextLessonId(nextLessonId);
            }
            return nextLessonId;
          } else {
            const response = await CoursesManager.getNextLevelId(level._id);
            //returns the next level's id

            if (response) {
              if (response === 'finished') {
                return response;
              }
              const nextLevel = await LevelsModel.findById(response);
              if (nextLevel) {
                const nextLessonId = nextLevel.lessonsIds[0];
                if (nextLevel.suspendedLessonsIds.includes(nextLessonId)) {
                  await this.getNextLessonId(nextLessonId);
                }
                return nextLessonId;
              } else return null;
            } else return null;
          }
        } else return null;
      } else return null;
    } catch (error: any) {
      console.error('Repository Error:', error.message);
      throw new Error(`Level repo - getNextLessonId: ${error}`);
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
      console.log('lessons repo updateLevel', updatedLevel);
      return updatedLevel;
    } catch (error: any) {
      console.error('Repository Error:', error.message);
      throw new Error(`Level repo - updateLevel: ${error}`);
    }
  }

  static async suspendLessonById(
    levelId: string,
    lessonId: string
  ): Promise<LevelsType | null> {
    try {
      const level = await LevelsModel.findById(levelId);
      if (!level) {
        return null;
      }

      const suspendedLessonsIds = level.suspendedLessonsIds;
      if (suspendedLessonsIds.includes(lessonId)) {
        return null;
      }

      const updatedLevel = await LevelsModel.findByIdAndUpdate(
        levelId,
        { suspendedLessonsIds: [...suspendedLessonsIds, lessonId] },
        { new: true }
      );
      console.log('lessons repo suspendLessonById', updatedLevel);
      return updatedLevel;
    } catch (error: any) {
      console.error('Repository Error:', error.message);
      throw new Error(`Level repo - suspendLessonById: ${error}`);
    }
  }

  static async unsuspendLessonById(
    levelId: string,
    lessonId: string
  ): Promise<LevelsType | null> {
    try {
      const level = await LevelsModel.findById(levelId);
      if (!level) {
        return null;
      }

      const suspendedLessonsIds = level.suspendedLessonsIds;
      if (!suspendedLessonsIds.includes(lessonId)) {
        return null;
      }

      const updatedLevel = await LevelsModel.findByIdAndUpdate(
        levelId,
        {
          suspendedLessonsIds: suspendedLessonsIds.filter(
            (lesson) => lesson !== lessonId
          ),
        },
        { new: true }
      );
      console.log('lessons repo unsuspendLessonById', updatedLevel);
      return updatedLevel;
    } catch (error: any) {
      console.error('Repository Error:', error.message);
      throw new Error(`Level repo - unsuspendLessonById: ${error}`);
    }
  }

  static async deleteLevel(levelId: string): Promise<LevelsType | null> {
    try {
      // First, find courses that reference this level
      const CourseModel = (await import('../courses/model.js')).default;
      const coursesWithLevel = await CourseModel.find({
        levelsIds: levelId
      });
      
      // Update each course to remove the levelId
      for (const course of coursesWithLevel) {
        await CourseModel.findByIdAndUpdate(
          course._id,
          { $pull: { levelsIds: levelId } },
          { new: true }
        );
        
        // Clear cache for this course
        const CoursesManager = (await import('../courses/manager.js')).default;
        await CoursesManager.clearCourseDataCaches(course._id.toString());
        console.log(`Removed level ${levelId} from course ${course._id}`);
      }

      // Delete the level itself
      const status = await LevelsModel.findOneAndDelete({ _id: levelId });
      console.log('lessons repo deleteLevel', status);
      return status;
    } catch (error: any) {
      console.error('Repository Error:', error.message);
      throw new Error(`Level repo - deleteLevel: ${error}`);
    }
  }
}
