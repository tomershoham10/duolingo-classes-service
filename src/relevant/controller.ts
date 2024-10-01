import { Request, Response } from 'express';
import RelevantManager from './manager.js';

export default class RelevantController {
  static async create(req: Request, res: Response) {
    try {
      const reqRelevant = req.body as RelevantType;

      console.log('RelevantController create - reqRelevant', reqRelevant);
      const newRelevant = await RelevantManager.createRelevant(reqRelevant);
      if (newRelevant === null) {
        res.status(404).json({ message: 'Relevant already exised' });
      } else {
        res
          .status(201)
          .json({ message: 'Relevant registered successfully', newRelevant });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ err: 'Internal Server Error' });
    }
  }

  static async getById(req: Request, res: Response) {
    try {
      const relevantId: string = req.params.id;
      console.log('controller', relevantId);
      const relevant = await RelevantManager.getRelevantById(relevantId);
      if (!relevant) {
        return res.status(404).json({ message: 'Relevant not found' });
      }

      res.status(200).json({ relevant });
    } catch (error) {
      console.error(error);
      res.status(500).json({ err: 'Internal Server Error' });
    }
  }

  static async getMany(_req: Request, res: Response) {
    try {
      console.log('relevant controller getAll');
      const lists = await RelevantManager.getAllLists();
      console.log(lists);
      res.status(200).json({ lists });
    } catch (error) {
      console.error(error);
      res.status(500).json({ err: 'Internal Server Error' });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const relevantId: string = req.params.id;
      const fieldsToUpdate: Partial<RelevantType> = req.body;

      const updatedRelevant = await RelevantManager.updateRelevant(
        relevantId,
        fieldsToUpdate
      );

      if (!updatedRelevant) {
        return res.status(404).json({ message: 'Relevant not found' });
      }

      res.status(200).json({ updatedRelevant });
    } catch (error) {
      console.error(error);
      res.status(500).json({ err: 'Internal Server Error' });
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const relevantId: string = req.params.id;
      const deletedRelevant = await RelevantManager.deleteRelevant(relevantId);

      if (!deletedRelevant) {
        return res.status(404).json({ message: 'Relevant not found' });
      }

      res.status(200).json({ deletedRelevant });
    } catch (error) {
      console.error(error);
      res.status(500).json({ err: 'Internal Server Error' });
    }
  }
}
