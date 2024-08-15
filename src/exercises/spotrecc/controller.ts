import { Request, Response } from 'express';
import SpotreccManager from './manager.js';

export default class SpotreccController {
  static async create(req: Request, res: Response) {
    try {
      const newExercise = await SpotreccManager.createExercise(req.body);
      if (newExercise) {
        return res
          .status(201)
          .json({ message: 'Exercise created successfully', newExercise });
      } else {
        return res.status(500).json({ error: 'failed to create an exercise.' });
      }
    } catch (error: any) {
      console.error('Controller Error:', error.message);
      res.status(500).json({ error: error.message });
    }
  }


}
