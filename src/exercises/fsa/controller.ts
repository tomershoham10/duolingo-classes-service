import { Request, Response } from 'express';
import FsaManager from './manager.js';

export default class FsaController {
  static async create(req: Request, res: Response) {
    try {
      const newExercise = await FsaManager.createExercise(req.body);
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

  static async getRelevantByExerciseId(req: Request, res: Response) {
    try {
      const exerciseId: string = req.params.exerciseId;
      console.log('Exercise controller getRelevantByExerciseId', exerciseId);
      const relevantTargets =
        await FsaManager.getRelevantByExerciseId(exerciseId);
      if (!relevantTargets) {
        return res.status(404).json({ message: 'relevant not found' });
      }

      return res.status(200).json({ relevantTargets });
    } catch (error: any) {
      console.error('Controller Error:', error.message);
      res.status(500).json({ error: error.message });
    }
  }

  static async getAnswersByExerciseId(req: Request, res: Response) {
    try {
      const exerciseId: string = req.params.exerciseId;
      console.log('Exercise controller getAnswersByExerciseId', exerciseId);
      const answers = await FsaManager.getAnswersByExerciseId(exerciseId);
      if (!answers) {
        return res.status(404).json({ message: 'targets not found' });
      }

      return res.status(200).json({ answers });
    } catch (error: any) {
      console.error('Controller Error:', error.message);
      res.status(500).json({ error: error.message });
    }
  }

  static async getByTargetId(req: Request, res: Response) {
    try {
      const targetId: string = req.params.targetId;
      console.log('Exercise controller getByTargetId', targetId);
      const exercises = await FsaManager.getExerciseByTargetId(targetId);
      if (!exercises) {
        return res.status(404).json({ message: 'Exercise not found' });
      }

      return res.status(200).json({ exercises });
    } catch (error: any) {
      console.error('Controller Error:', error.message);
      res.status(500).json({ error: error.message });
    }
  }

  static async getById(req: Request, res: Response) {
    try {
      const exerciseId: string = req.params.id;
      console.log('Exercise controller', exerciseId);
      const exercise = await FsaManager.getExerciseById(exerciseId);
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
      const exercises = await FsaManager.getAllExercise();
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

      const updatedExercise = await FsaManager.updateExercise(
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
      const status = await FsaManager.deleteExercise(exerciseId);

      if (!status) {
        return res.status(404).json({ message: 'Exercise not found' });
      }

      return res.status(200).json({ status });
    } catch (error: any) {
      console.error('Controller Error:', error.message);
      res.status(500).json({ error: error.message });
    }
  }
}
