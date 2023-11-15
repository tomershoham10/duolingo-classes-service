import Express, { NextFunction } from "express";
import OptionManager from "./manager.js";

export default class OptionController {
  static async create(
    req: Express.Request,
    res: Express.Response,
    next: NextFunction
  ) {
    try {
      const { name, type } = req.body as { name: string; type: TypesOfOptions };

      const reqOption: {
        name: string,
        type: TypesOfOptions
      } = { name: name, type: type };

      const newOption = await OptionManager.createOption(reqOption);
      res
        .status(201)
        .json({ message: "Option registered successfully", newOption });
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
      const optionId: string = req.params.id;
      console.log("controller", optionId);
      const option = await OptionManager.getOptionById(optionId);
      if (!option) {
        return res.status(404).json({ message: "Option not found" });
      }

      res.status(200).json({ option });
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
      console.log("option controller getAll");
      const options = await OptionManager.getAllOption();
      console.log(options);
      res.status(200).json({ options });
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
      const optionId: string = req.params.id;
      const fieldsToUpdate: Partial<OptionType> = req.body;

      const updatedOption = await OptionManager.updateOption(
        optionId,
        fieldsToUpdate
      );

      if (!updatedOption) {
        return res.status(404).json({ message: "Option not found" });
      }

      res.status(200).json({ updatedOption });
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
      const optionId: string = req.params.id;
      const deletedOption = await OptionManager.deleteOption(optionId);

      if (!deletedOption) {
        return res.status(404).json({ message: "Option not found" });
      }

      res.status(200).json({ deletedOption });
    } catch (error) {
      console.error(error);
      res.status(500).json({ err: "Internal Server Error" });
      next(error);
    }
  }
}
