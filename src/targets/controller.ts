import { Request, Response } from 'express';
import TargetsManager from './manager.js';

export default class TargetsController {
  static async create(req: Request, res: Response) {
    try {
      const reqTarget = req.body as TargetType;

      console.log('TargetsController create - reqTarget', reqTarget);
      const newTarget = await TargetsManager.createTarget(reqTarget);
      res
        .status(201)
        .json({ message: 'Target registered successfully', newTarget });
    } catch (error) {
      console.error(error);
      res.status(500).json({ err: 'Internal Server Error' });
    }
  }

  static async getById(req: Request, res: Response) {
    try {
      const targetId: string = req.params.id;
      console.log('controller', targetId);
      const target = await TargetsManager.getTargetById(targetId);
      if (!target) {
        return res.status(404).json({ message: 'Target not found' });
      }

      res.status(200).json({ target });
    } catch (error) {
      console.error(error);
      res.status(500).json({ err: 'Internal Server Error' });
    }
  }

  static async getMany(_req: Request, res: Response) {
    try {
      console.log('target controller getAll');
      const targets = await TargetsManager.getAllTarget();
      console.log(targets);
      res.status(200).json({ targets });
    } catch (error) {
      console.error(error);
      res.status(500).json({ err: 'Internal Server Error' });
    }
  }

  static async getTargetAncestors(req: Request, res: Response) {
    try {
      console.log('target controller getTargetAncestors');
      const targetId: string = req.params.id;
      const ancestors = await TargetsManager.getTargetAncestors(targetId);
      console.log(ancestors);
      res.status(200).json({ ancestors });
    } catch (error) {
      console.error(error);
      res.status(500).json({ err: 'Internal Server Error' });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const targetId: string = req.params.id;
      const fieldsToUpdate: Partial<TargetType> = req.body;

      const updatedTarget = await TargetsManager.updateTarget(
        targetId,
        fieldsToUpdate
      );

      if (!updatedTarget) {
        return res.status(404).json({ message: 'Target not found' });
      }

      res.status(200).json({ updatedTarget });
    } catch (error) {
      console.error(error);
      res.status(500).json({ err: 'Internal Server Error' });
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const targetId: string = req.params.id;
      const deletedTarget = await TargetsManager.deleteTarget(targetId);

      if (!deletedTarget) {
        return res.status(404).json({ message: 'Target not found' });
      }

      res.status(200).json({ deletedTarget });
    } catch (error) {
      console.error(error);
      res.status(500).json({ err: 'Internal Server Error' });
    }
  }
}
