import { Request, Response } from 'express';
import ExercisesManager from './manager.js';

export default class ExercisesController {
  static async create(req: Request, res: Response) {
    try {
      const reqBody = req.body;
      console.log('controller - create exercise - reqBody', reqBody);
      const newExercise = await ExercisesManager.createExercise(reqBody);
      if (newExercise) {
        return res
          .status(201)
          .json({ message: 'Exercise created successfully', newExercise });
      } else {
        throw new Error('Course controller create error.');
      }
    } catch (error: any) {
      console.error('Controller Error:', error.message);
      res.status(500).json({ error: error.message });
    }
  }

  static async getById(req: Request, res: Response) {
    try {
      const exerciseId: string = req.params.id;
      console.log('Exercise controller', exerciseId);
      const exercise = await ExercisesManager.getExerciseById(exerciseId);
      if (!exercise) {
        return res.status(404).json({ message: 'Exercise not found' });
      }

      return res.status(200).json({ exercise });
    } catch (error: any) {
      console.error('Controller Error:', error.message);
      res.status(500).json({ error: error.message });
    }
  }

  static async getMany(_req: Request, res: Response) {
    try {
      const exercises = await ExercisesManager.getAllExercises();
      console.log(exercises);
      return res.status(200).json({ exercises });
    } catch (error: any) {
      console.error('Controller Error:', error.message);
      res.status(500).json({ error: error.message });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const exerciseId: string = req.params.id;
      const fieldsToUpdate: Partial<FsaType> = req.body;

      const updatedExercise = await ExercisesManager.updateExercise(
        exerciseId,
        fieldsToUpdate
      );

      if (!updatedExercise) {
        return res.status(404).json({ message: 'Exercise not found' });
      }

      return res.status(200).json({ updatedExercise });
    } catch (error: any) {
      console.error('Controller Error:', error.message);
      res.status(500).json({ error: error.message });
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const exerciseId: string = req.params.id;
      const status = await ExercisesManager.deleteExercise(exerciseId);

      if (!status) {
        return res.status(404).json({ message: 'Exercise not found' });
      }

      return res.status(200).json({ status });
    } catch (error: any) {
      console.error('Controller Error:', error.message);
      res.status(500).json({ error: error.message });
    }
  }

  static async getResultByUserAndExerciseId(req: Request, res: Response) {
    try {
      const exerciseId: string = req.params.exerciseId;
      const userId: string = req.params.userId;
      console.log(
        'Exercise controller getResultByUserAndExerciseId',
        exerciseId,
        userId
      );
      const result = await ExercisesManager.getResultByUserAndExerciseId(
        exerciseId,
        userId
      );
      console.log(
        'Exercise controller getResultByUserAndExerciseId - result',
        result,
        result === null
      );
      if (!result) {
        return res.status(404).json({ message: 'result not found' });
      }

      return res.status(200).json({ result });
    } catch (error: any) {
      console.error('Controller Error:', error.message);
      res.status(500).json({ error: error.message });
    }
  }
}
