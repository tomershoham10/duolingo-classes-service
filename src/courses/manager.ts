import { startSession } from 'mongoose';
import CoursesRepository from './repository.js';
import LevelsManager from '../levels/manager.js';
import LevelsRepository from '../levels/repository.js';
import {
  getFromCache,
  resetNamespaceCache,
  setToCache,
} from '../utils/cache.js';

export default class CoursesManager {
  static async createCourse(
    courseName: string,
    description: string
  ): Promise<CoursesType | undefined> {
    const session = await startSession();
    session.startTransaction();
    try {
      const createdLevel = await LevelsManager.createLevel();
      console.log('createCourse manager - createdLevel', createdLevel);
      const createdCourse = await CoursesRepository.createCourse({
        name: courseName,
        description: description,
        levelsIds: [createdLevel._id],
        suspendedLevelsIds: [],
      });
      await setToCache(
        'courses',
        createdCourse._id,
        JSON.stringify(createdCourse),
        3600
      );
      await resetNamespaceCache('getAllCourses', 'allCourses');
      await session.commitTransaction();
      return createdCourse;
    } catch (error: any) {
      await session.abortTransaction();
      console.error('Manager Error [createCourse]:', error.message);
      throw new Error('Error in course creation process');
    } finally {
      session.endSession();
    }
  }

  static async getCourseById(courseId: string): Promise<CoursesType | null> {
    try {
      const cachedCourse = await getFromCache('courses', courseId);
      if (cachedCourse) {
        console.log('Cache hit: courses manager - getCourseById', courseId);
        return JSON.parse(cachedCourse); // Parse cached JSON data
      }

      const course = await CoursesRepository.getCourseById(courseId);
      course !== null
        ? await setToCache('courses', courseId, JSON.stringify(course), 3600)
        : null;
      console.log('courses manager', course);
      return course;
    } catch (error: any) {
      console.error('Manager Error [getCourseById]:', error.message);
      throw new Error('Error in getCourseById');
    }
  }

  static async getCourseByName(
    courseName: string
  ): Promise<CoursesType | null> {
    try {
      const cachedCourse = await getFromCache('coursesByName', courseName);
      if (cachedCourse) {
        console.log('Cache hit: courses manager - getCourseByName', courseName);
        return JSON.parse(cachedCourse); // Parse cached JSON data
      }
      const course = await CoursesRepository.getCourseByName(courseName);
      course !== null
        ? await setToCache(
            'coursesByName',
            courseName,
            JSON.stringify(course),
            3600
          )
        : null;
      console.log('courses manager', course);
      return course;
    } catch (error: any) {
      console.error('Manager Error [getCourseById]:', error.message);
      throw new Error('Error in getting course by id');
    }
  }

  static async getCourseDataById(courseId: string): Promise<any[] | null> {
    try {
      // Always get fresh course data to check level count
      const course = await CoursesRepository.getCourseById(courseId);
      const levelCount = course ? course.levelsIds.length : 0;
      const cacheKey = `${courseId}_v2_${levelCount}`;
      
      // Include timestamp in cache to limit cache lifetime
      const now = Math.floor(Date.now() / 1000); // Current time in seconds
      const maxCacheAge = 60; // Maximum cache age in seconds (1 minute)
      
      const cachedCourse = await getFromCache('getCourseDataById', cacheKey);
      if (cachedCourse) {
        try {
          const parsedCache = JSON.parse(cachedCourse);
          // Check if the cache has timestamp and is fresh enough
          if (parsedCache._timestamp && (now - parsedCache._timestamp < maxCacheAge)) {
            console.log('Cache hit: courses manager - getCourseDataById', courseId);
            return parsedCache.data;
          } else {
            console.log('Cache expired or invalid: courses manager - getCourseDataById', courseId);
          }
        } catch (e) {
          console.log('Invalid cache data: courses manager - getCourseDataById', courseId);
        }
      }
      
      // If we get here, we need fresh data
      const courseData = await CoursesRepository.getCourseDataById(courseId);
      
      // Store data with timestamp
      const cacheData = {
        _timestamp: now,
        data: courseData
      };
      
      await setToCache(
        'getCourseDataById',
        cacheKey,
        JSON.stringify(cacheData),
        maxCacheAge * 2 // Cache TTL slightly longer than our max age check
      );
      
      console.log('courses manager getCourseDataById', courseData);
      return courseData;
    } catch (error: any) {
      console.error('Manager Error [getCourseDataById]:', error.message);
      throw new Error('Error in getting course data by id');
    }
  }

  static async getUnsuspendedLevelsByCourseId(
    courseId: string
  ): Promise<LevelsType[]> {
    try {
      const cachedLevels = await getFromCache(
        'getUnsuspendedLevelsByCourseId',
        courseId
      );
      if (cachedLevels) {
        console.log(
          'Cache hit: courses manager - getUnsuspendedLevelsByCourseId',
          courseId
        );
        return JSON.parse(cachedLevels); // Parse cached JSON data
      }
      const levels =
        await CoursesRepository.getUnsuspendedLevelsByCourseId(courseId);
      await setToCache(
        'getUnsuspendedLevelsByCourseId',
        courseId,
        JSON.stringify(levels),
        3600
      );
      console.log('courses manager getUnsuspendedLevelsByCourseId', levels);
      return levels;
    } catch (error: any) {
      console.error(
        'Manager Error [getUnsuspendedLevelsByCourseId]:',
        error.message
      );
      throw new Error('Error in getting unsuspended levels by course id');
    }
  }

  static async getFirstLessonId(courseId: string): Promise<string | null> {
    try {
      const cachedLessonId = await getFromCache('getFirstLessonId', courseId);
      if (cachedLessonId) {
        console.log('Cache hit: courses manager - getFirstLessonId', courseId);
        return JSON.parse(cachedLessonId);
      }
      const levels =
        await CoursesRepository.getUnsuspendedLevelsByCourseId(courseId);
      if (levels.length > 0) {
        const firstLevelId = levels[0]._id;
        const lessons =
          await LevelsRepository.getsLessonsByLevelId(firstLevelId);
        const lessonId = lessons.length > 0 ? lessons[0]._id : null;
        lessonId
          ? await setToCache(
              'getFirstLessonId',
              courseId,
              JSON.stringify(lessonId),
              2592000
            )
          : null;
        return lessonId;
      }
      return null;
    } catch (error: any) {
      console.error('Manager Error [getFirstLessonId]:', error.message);
      throw new Error('Error in getFirstLessonId');
    }
  }

  static async getNextLevelId(prevLevelId: string): Promise<string | null> {
    try {
      const cachedLevelId = await getFromCache('getNextLevelId', prevLevelId);
      if (cachedLevelId) {
        console.log('Cache hit: courses manager - getNextLevelId', prevLevelId);
        return JSON.parse(cachedLevelId);
      }
      const nextLevelId = await CoursesRepository.getNextLevelId(prevLevelId);
      nextLevelId
        ? await setToCache(
            'getNextLevelId',
            prevLevelId,
            JSON.stringify(nextLevelId),
            3600
          )
        : null;
      console.log('courses manager getNextLevelId', nextLevelId);
      if (nextLevelId) {
        return nextLevelId;
      } else return null;
    } catch (error: any) {
      console.error('Manager Error [getNextLevelId]:', error.message);
      throw new Error('Error in getting next level id');
    }
  }

  static async getAllCourses(): Promise<CoursesType[]> {
    try {
      const cachedCourses = await getFromCache('getAllCourses', 'allCourses');
      if (cachedCourses) {
        console.log(
          'Cache hit: courses manager - getAllCourses',
          cachedCourses
        );
        return JSON.parse(cachedCourses); // Parse cached JSON data
      }
      const courses = await CoursesRepository.getAllCourses();
      await setToCache(
        'getAllCourses',
        'allCourses',
        JSON.stringify(courses),
        3600
      );

      return courses;
    } catch (error: any) {
      console.error('Manager Error [getAllCourses]:', error.message);
      throw new Error('Error in getAllCourses');
    }
  }

  static async clearCourseDataCaches(courseId: string): Promise<void> {
    try {
      // Clear specific course data cache
      await resetNamespaceCache('getCourseDataById', courseId);
      
      // To handle our new versioned cache keys, clear using a wildcard pattern
      // This will ensure that any versions of the cache get cleared
      await resetNamespaceCache('getCourseDataById', `${courseId}_v*`);
      
      console.log(`Cleared all cache keys for course data: ${courseId}`);
    } catch (error: any) {
      console.error('Error clearing cache:', error.message);
    }
  }

  static async updateCourse(
    courseId: string,
    fieldsToUpdate: Partial<CoursesType>
  ): Promise<CoursesType | null> {
    try {
      const updatedCourse = await CoursesRepository.updateCourse(
        courseId,
        fieldsToUpdate
      );
      if (updatedCourse) {
        await setToCache(
          'courses',
          courseId,
          JSON.stringify(updatedCourse),
          3600
        );
        
        // Use our comprehensive cache clearing function
        await this.clearCourseDataCaches(courseId);
        
        // Continue clearing other caches
        await resetNamespaceCache('getUnsuspendedLevelsByCourseId', courseId);
        await resetNamespaceCache('getFirstLessonId', courseId);
        await resetNamespaceCache('getAllCourses', 'allCourses');
        
        // Reset name-based cache if name was updated
        if (fieldsToUpdate.name) {
          await resetNamespaceCache('coursesByName', updatedCourse.name);
        }
      }
      return updatedCourse;
    } catch (error: any) {
      console.error('Manager Error [updateCourse]:', error.message);
      throw new Error('Error in updateCourse');
    }
  }

  static async suspendLevelByCourseId(
    courseId: string,
    levelId: string
  ): Promise<CoursesType | null> {
    try {
      const updatedCourse = await CoursesRepository.suspendLevelByCourseId(
        courseId,
        levelId
      );
      if (updatedCourse) {
        await setToCache(
          'courses',
          courseId,
          JSON.stringify(updatedCourse),
          3600
        );
        await this.clearCourseDataCaches(courseId);
        await resetNamespaceCache('getUnsuspendedLevelsByCourseId', courseId);
        await resetNamespaceCache('getFirstLessonId', courseId);
        await resetNamespaceCache('getAllCourses', 'allCourses');
      }
      return updatedCourse;
    } catch (error: any) {
      console.error('Manager Error [suspendLevelByCourseId]:', error.message);
      throw new Error('Error in suspendLevelByCourseId');
    }
  }

  static async unsuspendLevelByCourseId(
    courseId: string,
    levelId: string
  ): Promise<CoursesType | null> {
    try {
      const updatedCourse = await CoursesRepository.unsuspendLevelByCourseId(
        courseId,
        levelId
      );
      if (updatedCourse) {
        await setToCache(
          'courses',
          courseId,
          JSON.stringify(updatedCourse),
          3600
        );
        await this.clearCourseDataCaches(courseId);
        await resetNamespaceCache('getUnsuspendedLevelsByCourseId', courseId);
        await resetNamespaceCache('getFirstLessonId', courseId);
        await resetNamespaceCache('getAllCourses', 'allCourses');
      }
      return updatedCourse;
    } catch (error: any) {
      console.error('Manager Error [unsuspendLevelByCourseId]:', error.message);
      throw new Error('Error in unsuspendLevelByCourseId');
    }
  }

  static async deleteCourse(courseId: string): Promise<CoursesType | null> {
    try {
      const status = await CoursesRepository.deleteCourse(courseId);
      if (status) {
        await resetNamespaceCache('courses', courseId);
        await this.clearCourseDataCaches(courseId);
        await resetNamespaceCache('getUnsuspendedLevelsByCourseId', courseId);
        await resetNamespaceCache('getFirstLessonId', courseId);
      }
      await resetNamespaceCache('getAllCourses', 'allCourses');
      return status;
    } catch (error: any) {
      console.error('Manager Error [deleteCourse]:', error.message);
      throw new Error('Error in deleteCourse');
    }
  }
}
