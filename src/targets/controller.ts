import Express, { NextFunction } from "express";
import TargetManager from "./manager.js";

export default class TargetController {
  static async create(
    req: Express.Request,
    res: Express.Response,
    next: NextFunction
  ) {
    try {
      const { name, countryId, type, subType } = req.body as { name: string; countryId: string; type: TypesOfTargets, subType: TypesOfVessels | TypesOfTorpedos | TypesOfSonars };

      const reqTarget: {
        name: string,
        countryId: string,
        type: TypesOfTargets,
        subType: TypesOfVessels | TypesOfTorpedos | TypesOfSonars
      } = { name: name, countryId: countryId, type: type, subType: subType };
      console.log("TargetController create - reqTarget", reqTarget);
      const newTarget = await TargetManager.createTarget(reqTarget);
      res
        .status(201)
        .json({ message: "Target registered successfully", newTarget });
    } catch (error) {
      console.error(error);
      res.status(500).json({ err: "Internal Server Error" });
      next(error);
    }
  }

  static async getById(
    req: Express.Request,
    res: Express.Response,
    next: NextFunction
  ) {
    try {
      const targetId: string = req.params.id;
      console.log("controller", targetId);
      const target = await TargetManager.getTargetById(targetId);
      if (!target) {
        return res.status(404).json({ message: "Target not found" });
      }

      res.status(200).json({ target });
    } catch (error) {
      console.error(error);
      res.status(500).json({ err: "Internal Server Error" });
      next(error);
    }
  }

  static async getMany(
    _req: Express.Request,
    res: Express.Response,
    next: NextFunction
  ) {
    try {
      console.log("target controller getAll");
      const targets = await TargetManager.getAllTarget();
      console.log(targets);
      res.status(200).json({ targets });
    } catch (error) {
      console.error(error);
      res.status(500).json({ err: "Internal Server Error" });
      next(error);
    }
  }

  static async update(
    req: Express.Request,
    res: Express.Response,
    next: NextFunction
  ) {
    try {
      const targetId: string = req.params.id;
      const fieldsToUpdate: Partial<TargetType> = req.body;

      const updatedTarget = await TargetManager.updateTarget(
        targetId,
        fieldsToUpdate
      );

      if (!updatedTarget) {
        return res.status(404).json({ message: "Target not found" });
      }

      res.status(200).json({ updatedTarget });
    } catch (error) {
      console.error(error);
      res.status(500).json({ err: "Internal Server Error" });
      next(error);
    }
  }

  static async delete(
    req: Express.Request,
    res: Express.Response,
    next: NextFunction
  ) {
    try {
      const targetId: string = req.params.id;
      const deletedTarget = await TargetManager.deleteTarget(targetId);

      if (!deletedTarget) {
        return res.status(404).json({ message: "Target not found" });
      }

      res.status(200).json({ deletedTarget });
    } catch (error) {
      console.error(error);
      res.status(500).json({ err: "Internal Server Error" });
      next(error);
    }
  }
}
