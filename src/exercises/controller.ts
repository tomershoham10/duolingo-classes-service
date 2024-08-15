import { Request, Response } from 'express';
import ExercisesManager from './manager.js';

export default class SpotreccController {
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
