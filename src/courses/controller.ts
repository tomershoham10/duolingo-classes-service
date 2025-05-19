import { Request, Response } from 'express';
import CoursesManager from './manager.js';
import CoursesModel from './model.js';
import capitalizeWords from '../utils/capitalizeWords.js';

export default class CoursesController {
  static async create(req: Request, res: Response) {
    try {
      const courseName = req.body.name as string;
      const description = req.body.description as string;
      console.log('create course - courseName', courseName);
      const isExisted = await CoursesModel.findOne({ name: courseName });
      if (isExisted) {
        console.error('course already existed');
        return res.status(403).json({ error: 'course already existed' });
      }

      const newCourse = await CoursesManager.createCourse(courseName, description);
      if (newCourse) {
        return res
          .status(201)
          .json({ message: 'course created successfully', newCourse });
      } else {
        throw new Error('Course controller create error.');
      }
    } catch (error: any) {
      console.error('Controller Error:', error.message);
      res.status(400).json({ error: error.message });
    }
  } // cached

  static async getById(req: Request, res: Response) {
    try {
      const courseId: string = req.params.id;
      console.log('courses controller', courseId);
      const course = await CoursesManager.getCourseById(courseId);
      if (!course) {
        return res.status(404).json({ message: 'course not found' });
      }

      // Transform the response to maintain backward compatibility
      // Handle both Mongoose documents and plain objects
      const courseObj = typeof course.toObject === 'function' ? course.toObject() : course;
      const transformedCourse = {
        ...courseObj,
        unitsIds: course.levelsIds,
        suspendedUnitsIds: course.suspendedLevelsIds
      };

      res.status(200).json({ course: transformedCourse });
    } catch (error: any) {
      console.error('Controller Error:', error.message);
      res.status(500).json({ error: error.message });
    }
  } // cached

  static async getByName(req: Request, res: Response) {
    try {
      const courseName: string = req.params.courseName;
      console.log('courses controller - getByName', courseName);
      const course = await CoursesManager.getCourseByName(
        courseName // Remove capitalization to make search case-insensitive
      );
      if (!course) {
        return res.status(404).json({ message: 'course not found' });
      }

      // Transform the response to maintain backward compatibility
      // Handle both Mongoose documents and plain objects
      const courseObj = typeof course.toObject === 'function' ? course.toObject() : course;
      const transformedCourse = {
        ...courseObj,
        unitsIds: course.levelsIds,
        suspendedUnitsIds: course.suspendedLevelsIds
      };

      res.status(200).json({ course: transformedCourse });
    } catch (error: any) {
      console.error('Controller Error:', error.message);
      res.status(500).json({ error: error.message });
    }
  } // cached

  static async getCourseDataById(req: Request, res: Response) {
    try {
      const courseId: string = req.params.id;
      console.log('controller: getUnitsById', courseId);
      const courseData = await CoursesManager.getCourseDataById(courseId);
      return courseData === null
        ? res.status(500).json({ message: 'course not found' })
        : courseData.length <= 0
          ? res.status(500).json({ message: 'course is empty' })
          : res.status(200).json({ courseData });
    } catch (error: any) {
      console.error('Controller Error:', error.message);
      res.status(500).json({ error: error.message });
    }
  } // cached

  static async getUnsuspendedUnitsById(req: Request, res: Response) {
    try {
      const courseId: string = req.params.id;
      console.log('controller: getUnitsById', courseId);
      const units =
        await CoursesManager.getUnsuspendedLevelsByCourseId(courseId);
      return units.length <= 0
        ? res.status(404).json({ message: 'units not found' })
        : res.status(200).json({ units });
    } catch (error: any) {
      console.error('Controller Error:', error.message);
      res.status(500).json({ error: error.message });
    }
  } // cached

  static async getFirstLessonId(req: Request, res: Response) {
    try {
      const courseId: string = req.params.courseId;
      console.log('controller: getFirstLessonId', courseId);
      const lessonId = await CoursesManager.getFirstLessonId(courseId);
      if (!lessonId) {
        return res.status(404).json({ message: 'lesson not found' });
      }

      res.status(200).json({ lessonId });
    } catch (error: any) {
      console.error('Controller Error:', error.message);
      res.status(500).json({ error: error.message });
    }
  } // cached

  static async getNextUnitId(req: Request, res: Response) {
    try {
      const prevLevelId: string = req.params.prevUnitId as string;
      console.log('course controller: prevUnitId', prevLevelId);
      const nextUnitId = await CoursesManager.getNextLevelId(prevLevelId);
      if (!nextUnitId) {
        return res.status(404).json({ message: 'nextUnitId not found' });
      }
      res.status(200).json({ nextUnitId });
    } catch (error: any) {
      console.error('Controller Error:', error.message);
      res.status(500).json({ error: error.message });
    }
  } // cached

  static async getMany(_req: Request, res: Response) {
    try {
      const courses = await CoursesManager.getAllCourses();
      console.log('get all courses', courses);
      
      // Transform the response to maintain backward compatibility
      // Handle both Mongoose documents and plain objects
      const transformedCourses = courses.map(course => {
        const courseObj = typeof course.toObject === 'function' ? course.toObject() : course;
        return {
          ...courseObj,
          unitsIds: course.levelsIds,
          suspendedUnitsIds: course.suspendedLevelsIds
        };
      });
      
      res.status(200).json({ courses: transformedCourses });
    } catch (error: any) {
      console.error('Controller Error:', error.message);
      res.status(500).json({ error: error.message });
    }
  } // cached

  static async update(req: Request, res: Response) {
    try {
      const courseId: string = req.params.id;
      const fieldsToUpdate: Partial<CoursesType> = req.body;

      const updatedCouse = await CoursesManager.updateCourse(
        courseId,
        fieldsToUpdate
      );

      if (!updatedCouse) {
        return res.status(404).json({
          message: 'course controller - update: error while update a course',
        });
      }

      res.status(200).json({ updatedCouse });
    } catch (error: any) {
      console.error('Controller Error:', error.message);
      res.status(500).json({ error: error.message });
    }
  } // cached

  static async suspendLevel(req: Request, res: Response) {
    try {
      const courseId: string = req.params.courseId;
      const levelId: string = req.params.unitId;

      const updatedCouse = await CoursesManager.suspendLevelByCourseId(
        courseId,
        levelId
      );

      if (!updatedCouse) {
        return res.status(404).json({
          message:
            'course controller - suspendUnit: error while suspending a unit',
        });
      }

      res.status(200).json({ updatedCouse });
    } catch (error: any) {
      console.error('Controller Error:', error.message);
      res.status(500).json({ error: error.message });
    }
  } // cached

  static async unsuspendLevel(req: Request, res: Response) {
    try {
      const courseId: string = req.params.courseId;
      const unitId: string = req.params.unitId;

      const updatedCouse = await CoursesManager.unsuspendLevelByCourseId(
        courseId,
        unitId
      );

      if (!updatedCouse) {
        return res.status(404).json({
          message:
            'course controller - unsuspendUnit: error while unsuspending a unit',
        });
      }

      res.status(200).json({ updatedCouse });
    } catch (error: any) {
      console.error('Controller Error:', error.message);
      res.status(500).json({ error: error.message });
    }
  } // cached

  static async delete(req: Request, res: Response) {
    try {
      const courseId: string = req.params.id;
      const status = await CoursesManager.deleteCourse(courseId);

      if (!status) {
        return res.status(404).json({ message: 'Course not found' });
      }

      res.status(200).json({ status });
    } catch (error: any) {
      console.error('Controller Error:', error.message);
      res.status(500).json({ error: error.message });
    }
  } // cached
}
