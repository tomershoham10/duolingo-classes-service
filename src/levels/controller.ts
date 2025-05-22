import { Request, Response } from 'express';
import LevelsManager from './manager.js';
import mongoose from 'mongoose';
import CoursesModel from '../courses/model.js';
import CoursesManager from '../courses/manager.js';

export default class LevelsController {
  static async create(_req: Request, res: Response) {
    try {
      const newLevel = await LevelsManager.createLevel();

      if (newLevel) {
        return res
          .status(201)
          .json({ message: 'level created successfully', newLevel });
      } else {
        throw new Error('level controller create error.');
      }
    } catch (error: any) {
      console.error('Controller Error:', error.message);
      res.status(500).json({ error: error.message });
    }
  }

  static async createByCourse(req: Request, res: Response) {
    try {
      const courseId = req.params.courseId;

      const session = await mongoose.startSession();
      session.startTransaction();

      console.log('controller - createByCourse: courseId ', courseId);
      const course = await CoursesModel.findById(courseId);
      console.log('controller - createByCourse: course ', course);
      if (!course) {
        await session.abortTransaction();
        session.endSession();
        return res.status(404).json({ message: 'Course not found' });
      }

      const newLevel = await LevelsManager.createLevel();

      course.levelsIds
        ? course.levelsIds.push(newLevel._id.toString())
        : (course.levelsIds = [newLevel._id.toString()]);
      await course.save({ session: session });
      await session.commitTransaction();
      session.endSession();
      
      // Import and use CoursesManager to clear course data cache
      await CoursesManager.clearCourseDataCaches(courseId);
      console.log(`Cleared course data cache for courseId: ${courseId} after adding new level`);
      
      res
        .status(201)
        .json({ message: 'New level created and course updated successfully' });
    } catch (error: any) {
      console.error('Controller Error:', error.message);
      res.status(400).json({ error: error.message });
    }
  }

  static async getById(req: Request, res: Response) {
    const levelId: string = req.params.id;
    try {
      console.log('levels controller', levelId);
      const level = await LevelsManager.getLevelById(levelId);
      if (!level) {
        return res.status(404).json({ message: 'level not found' });
      }
      res.status(200).json({ level });
    } catch (error: any) {
      console.error('Controller Error:', error.message);
      res.status(500).json({ error: error.message });
    }
  }

  static async getExercisesById(req: Request, res: Response) {
    try {
      const levelId: string = req.params.id;
      console.log('controller: getExercisesById', levelId);
      const exercises = await LevelsManager.getsExercisesByLevelId(levelId);
      if (exercises.length <= 0) {
        return res.status(404).json({ message: 'exercises not found' });
      }

      res.status(200).json({ exercises });
    } catch (error: any) {
      console.error('Controller Error:', error.message);
      res.status(500).json({ error: error.message });
    }
  }

  static async getsUnsuspendedExercisesById(req: Request, res: Response) {
    try {
      const levelId: string = req.params.id;
      console.log('controller: getsUnsuspendedExercisesById', levelId);
      const exercises =
        await LevelsManager.getsUnsuspendedExercisesByLevelId(levelId);
      if (exercises.length <= 0) {
        return res.status(404).json({ message: 'exercises not found' });
      }

      res.status(200).json({ exercises });
    } catch (error: any) {
      console.error('Controller Error:', error.message);
      res.status(500).json({ error: error.message });
    }
  }

  static async getNextExerciseId(req: Request, res: Response) {
    try {
      const prevExerciseId: string = req.params.prevExerciseId;
      console.log('controller: getNextExerciseId', prevExerciseId);
      const nextExerciseId = await LevelsManager.getNextExerciseId(prevExerciseId);
      if (!nextExerciseId) {
        return res.status(404).json({ message: 'next exerciseId not found' });
      }

      res.status(200).json({ nextExerciseId });
    } catch (error: any) {
      console.error('Controller Error:', error.message);
      res.status(500).json({ error: error.message });
    }
  }

  static async getMany(_req: Request, res: Response) {
    try {
      const levels = await LevelsManager.getAllLevels();
      console.log(levels);
      res.status(200).json({ levels });
    } catch (error: any) {
      console.error('Controller Error:', error.message);
      res.status(500).json({ error: error.message });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const levelId: string = req.params.id;
      const fieldsToUpdate: Partial<LevelsType> = req.body;

      const updatedLevel = await LevelsManager.updateLevel(
        levelId,
        fieldsToUpdate
      );

      if (!updatedLevel) {
        return res.status(404).json({ message: 'Level not found' });
      }

      res.status(200).json({ updatedLevel });
    } catch (error: any) {
      console.error('Controller Error:', error.message);
      res.status(500).json({ error: error.message });
    }
  }

  static async suspendExercise(req: Request, res: Response) {
    try {
      const levelId: string = req.params.levelId;
      const exerciseId: string = req.params.exerciseId;

      const updatedLevel = await LevelsManager.suspendExerciseById(
        levelId,
        exerciseId
      );

      if (!updatedLevel) {
        return res
          .status(404)
          .json({ message: 'Level not found / exercise was already suspended' });
      }

      res.status(200).json({ updatedLevel });
    } catch (error: any) {
      console.error('Controller Error:', error.message);
      res.status(500).json({ error: error.message });
    }
  }

  static async unsuspendExercise(req: Request, res: Response) {
    try {
      const levelId: string = req.params.levelId;
      const exerciseId: string = req.params.exerciseId;

      const updatedLevel = await LevelsManager.unsuspendExerciseById(
        levelId,
        exerciseId
      );

      if (!updatedLevel) {
        return res.status(404).json({
          message: 'Level not found / exercise was already unsuspended',
        });
      }

      res.status(200).json({ updatedLevel });
    } catch (error: any) {
      console.error('Controller Error:', error.message);
      res.status(500).json({ error: error.message });
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const levelId = req.params.id;
      
      // Start by removing this level from any courses that reference it
      const coursesWithLevel = await CoursesModel.find({ 
        levelsIds: levelId 
      });
      
      // If there are courses using this level, update them first
      if (coursesWithLevel.length > 0) {
        for (const course of coursesWithLevel) {
          await CoursesModel.findByIdAndUpdate(
            course._id,
            { $pull: { levelsIds: levelId } },
            { new: true }
          );
          
          // Clear the cache for this course
          await CoursesManager.clearCourseDataCaches(course._id.toString());
          console.log(`Removed level ${levelId} from course ${course._id}`);
        }
      }

      // Then delete the level
      const deletedLevel = await LevelsManager.deleteLevel(levelId);
      
      if (!deletedLevel) {
        return res.status(404).json({ message: 'Level not found' });
      }
      
      res.status(200).json({ 
        message: 'Level deleted successfully',
        updatedCourses: coursesWithLevel.map(c => c._id)
      });
    } catch (error: any) {
      console.error('Controller Error:', error.message);
      res.status(500).json({ error: error.message });
    }
  }
}
