import { Request, Response, NextFunction } from 'express';
import LessonsManager from './manager.js';
import LessonsModel from './model.js';
import mongoose from 'mongoose';
import LevelsModel from '../levels/model.js';

export default class LessonsController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, exercises } = req.body as {
        name: string;
        exercises?: string[];
      };
      const reqLesson = {
        name: name,
        exercises: exercises,
      };

      const isExisted = await LessonsModel.findOne({ name: name });
      if (isExisted) {
        console.error('lesson already existed');
        return res.status(403).json({ error: 'lesson already existed' });
      }

      const newLesson = await LessonsManager.createLesson(reqLesson);
      res
        .status(201)
        .json({ message: 'Lesson created successfully', newLesson });
    } catch (error) {
      console.error(error);
      res.status(500).json({ err: 'Internal Server Error' });
      next(error);
    }
  }

  static async createByLevel(req: Request, res: Response) {
    try {
      const levelId = req.params.levelId;

      const session = await mongoose.startSession();
      session.startTransaction();

      console.log('controller - createByLevel: levelId ', levelId);
      const level = await LevelsModel.findById(levelId);
      console.log('controller - createByLevel: level ', level);
      if (!level) {
        await session.abortTransaction();
        session.endSession();
        return res.status(404).json({ message: 'level not found' });
      }

      const newLesson = await LessonsManager.createLesson({
        name: 'New Lesson',
        exercisesIds: [],
        suspendedExercisesIds: [],
      });

      level.lessonsIds
        ? level.lessonsIds.push(newLesson._id.toString())
        : (level.lessonsIds = [newLesson._id.toString()]);
      await level.save({ session: session });
      await session.commitTransaction();
      session.endSession();
      res
        .status(201)
        .json({ message: 'New lesson created and level updated successfully' });
    } catch (error: any) {
      console.error('Controller Error:', error.message);
      res.status(400).json({ error: error.message });
    }
  }

  static async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const lessonId: string = req.params.id;
      console.log('lessons controller', lessonId);
      const lesson = await LessonsManager.getLessonById(lessonId);
      if (!lesson) {
        return res.status(404).json({ message: 'lesson not found' });
      }

      res.status(200).json({ lesson });
    } catch (error) {
      console.error(error);
      res.status(500).json({ err: 'Internal Server Error' });
      next(error);
    }
  }

  static async getExercisesById(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const lessonId: string = req.params.id;
      console.log('lessons controller: getExercisesById', lessonId);
      const data = await LessonsManager.getsExercisesByLessonId(lessonId);
      if (data.length <= 0) {
        return res.status(404).json({ message: 'Exercises not found' });
      }

      res.status(200).json({ data });
    } catch (error) {
      console.error(error);
      res.status(500).json({ err: 'Internal Server Error' });
      next(error);
    }
  }

  static async getUnsuspendedExercisesById(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const lessonId: string = req.params.id;
      console.log('lessons controller: getUnsuspendedExercisesById', lessonId);
      const exercises =
        await LessonsManager.getsUnsuspendedExercisesByLessonId(lessonId);
      if (exercises.length <= 0) {
        return res.status(404).json({ message: 'Exercises not found' });
      }

      res.status(200).json({ exercises });
    } catch (error) {
      console.error(error);
      res.status(500).json({ err: 'Internal Server Error' });
      next(error);
    }
  }

  static async getResultsByLessonAndUser(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { lessonId, userId } = req.params;
      console.log(
        'lessons controller: getResultsById',
        'lessonId',
        lessonId,
        'userId',
        userId
      );
      const results = await LessonsManager.getResultsByLessonIdAndUserId(
        lessonId,
        userId
      );
      if (!results) {
        return res.status(404).json({ message: 'Results not found' });
      }

      res.status(200).json({ results });
    } catch (error) {
      console.error(error);
      res.status(500).json({ err: 'Internal Server Error' });
      next(error);
    }
  }

  static async getMany(_req: Request, res: Response, next: NextFunction) {
    try {
      const lessons = await LessonsManager.getAllLessons();
      console.log(lessons);
      res.status(200).json({ lessons });
    } catch (err) {
      console.error(err);
      res.status(500).json({ err: 'Internal Server Error' });
      next(err);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const lessonId: string = req.params.id;
      const fieldsToUpdate: Partial<LessonsType> = req.body;

      const updatedLesson = await LessonsManager.updateLesson(
        lessonId,
        fieldsToUpdate
      );

      if (!updatedLesson) {
        return res.status(404).json({ message: 'Lesson not found' });
      }

      res.status(200).json({ updatedLesson });
    } catch (error) {
      console.error(error);
      res.status(500).json({ err: 'Internal Server Error' });
      next(error);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const lessonId: string = req.params.id;
      const status = await LessonsManager.deleteLesson(lessonId);

      if (!status) {
        return res.status(404).json({ message: 'Lesson not found' });
      }

      res.status(200).json({ status });
    } catch (error) {
      console.error(error);
      res.status(500).json({ err: 'Internal Server Error' });
      next(error);
    }
  }
}
