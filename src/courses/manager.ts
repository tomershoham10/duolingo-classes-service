import { startSession } from 'mongoose';
import CoursesRepository from './repository.js';
import UnitsManager from '../units/manager.js';
import UnitsRepository from '../units/repository.js';
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
      const createdUnit = await UnitsManager.createUnit({});
      console.log('createCourse manager - createdUnit', createdUnit);
      const createdCourse = await CoursesRepository.createCourse({
        name: courseName,
        description: description,
        unitsIds: [createdUnit._id],
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
      const cachedCourse = await getFromCache('getCourseDataById', courseId);
      if (cachedCourse) {
        console.log('Cache hit: courses manager - getCourseDataById', courseId);
        return JSON.parse(cachedCourse); // Parse cached JSON data
      }
      const courseData = await CoursesRepository.getCourseDataById(courseId);
      await setToCache(
        'getUnitsByCourseId',
        courseId,
        JSON.stringify(courseData),
        3600
      );
      console.log('courses manager getCourseDataById', courseData);
      return courseData;
    } catch (error: any) {
      console.error('Manager Error [getUnitsByCourseId]:', error.message);
      throw new Error('Error in getting units by course id');
    }
  }

  static async getUnsuspendedUnitsByCourseId(
    courseId: string
  ): Promise<UnitsType[]> {
    try {
      const cachedUnits = await getFromCache(
        'getUnsuspendedUnitsByCourseId',
        courseId
      );
      if (cachedUnits) {
        console.log(
          'Cache hit: courses manager - getUnsuspendedUnitsByCourseId',
          courseId
        );
        return JSON.parse(cachedUnits); // Parse cached JSON data
      }
      const units =
        await CoursesRepository.getUnsuspendedUnitsByCourseId(courseId);
      await setToCache(
        'getUnsuspendedUnitsByCourseId',
        courseId,
        JSON.stringify(units),
        3600
      );
      console.log('courses manager getUnsuspendedUnitsByCourseId', units);
      return units;
    } catch (error: any) {
      console.error(
        'Manager Error [getUnsuspendedUnitsByCourseId]:',
        error.message
      );
      throw new Error('Error in getting unsuspended units by course id');
    }
  }

  static async getFirstLessonId(courseId: string): Promise<string | null> {
    try {
      const cachedLessonId = await getFromCache('getFirstLessonId', courseId);
      if (cachedLessonId) {
        console.log('Cache hit: courses manager - getFirstLessonId', courseId);
        return JSON.parse(cachedLessonId);
      }
      const units =
        await CoursesRepository.getUnsuspendedUnitsByCourseId(courseId);
      if (units.length > 0) {
        const firstUnitId = units[0]._id;
        const levels =
          await UnitsRepository.getUnsuspendedLevelsByUnitId(firstUnitId);
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
      }
      return null;
    } catch (error: any) {
      console.error('Manager Error [getFirstLessonId]:', error.message);
      throw new Error('Error in getFirstLessonId');
    }
  }

  static async getNextUnitId(prevUnitId: string): Promise<string | null> {
    try {
      const cachedUnitId = await getFromCache('getNextUnitId', prevUnitId);
      if (cachedUnitId) {
        console.log('Cache hit: courses manager - getNextUnitId', prevUnitId);
        return JSON.parse(cachedUnitId);
      }
      const nextUnitId = await CoursesRepository.getNextUnitId(prevUnitId);
      nextUnitId
        ? await setToCache(
            'getNextUnitId',
            prevUnitId,
            JSON.stringify(nextUnitId),
            3600
          )
        : null;
      console.log('courses manager getNextUnitId', nextUnitId);
      if (nextUnitId) {
        return nextUnitId;
      } else return null;
    } catch (error: any) {
      console.error('Manager Error [getNextUnitId]:', error.message);
      throw new Error('Error in getting next unit id');
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

  static async updateCourse(
    courseId: string,
    filedsToUpdate: Partial<CoursesType>
  ): Promise<CoursesType | null> {
    try {
      const updatedCourse = await CoursesRepository.updateCourse(
        courseId,
        filedsToUpdate
      );
      await setToCache(
        'courses',
        courseId,
        JSON.stringify(updatedCourse),
        3600
      );
      await resetNamespaceCache('getAllCourses', 'allCourses');

      return updatedCourse;
    } catch (error: any) {
      console.error('Manager Error [updateCourse]:', error.message);
      throw new Error('Error in updateCourse');
    }
  }

  static async suspendUnitByCourseId(
    courseId: string,
    unitId: string
  ): Promise<CoursesType | null> {
    try {
      const updatedCourse = await CoursesRepository.suspendUnitByCourseId(
        courseId,
        unitId
      );
      await setToCache(
        'courses',
        courseId,
        JSON.stringify(updatedCourse),
        3600
      );
      await resetNamespaceCache('getAllCourses', 'allCourses');

      return updatedCourse;
    } catch (error: any) {
      console.error('Manager Error [suspendUnitByCourseId]:', error.message);
      throw new Error('Error in suspendUnitByCourseId');
    }
  }

  static async unsuspendUnitByCourseId(
    courseId: string,
    unitId: string
  ): Promise<CoursesType | null> {
    try {
      const updatedCourse = await CoursesRepository.unsuspendUnitByCourseId(
        courseId,
        unitId
      );
      await setToCache(
        'courses',
        courseId,
        JSON.stringify(updatedCourse),
        3600
      );
      await resetNamespaceCache('getAllCourses', 'allCourses');

      return updatedCourse;
    } catch (error: any) {
      console.error('Manager Error [unsuspendUnitByCourseId]:', error.message);
      throw new Error('Error in unsuspendUnitByCourseId');
    }
  }

  static async deleteCourse(courseId: string): Promise<CoursesType | null> {
    try {
      const status = await CoursesRepository.deleteCourse(courseId);
      status ? await resetNamespaceCache('courses', courseId) : null;
      await resetNamespaceCache('getAllCourses', 'allCourses');
      return status;
    } catch (error: any) {
      console.error('Manager Error [deleteCourse]:', error.message);
      throw new Error('Error in deleteCourse');
    }
  }
}
