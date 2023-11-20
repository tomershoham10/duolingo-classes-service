import Express, { NextFunction } from "express";
import CountryManager from "./manager.js";

export default class CountryController {
  static async create(
    req: Express.Request,
    res: Express.Response,
    next: NextFunction
  ) {
    try {
      const { name } = req.body as { name: string };

      const reqCountry: { name: string, } = { name: name }
      console.log("CountryController create - reqCountry", reqCountry);
      const newCountry = await CountryManager.createCountry(reqCountry);
      res
        .status(201)
        .json({ message: "Country registered successfully", newCountry });
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
      const countryId: string = req.params.id;
      console.log("controller", countryId);
      const country = await CountryManager.getCountryById(countryId);
      if (!country) {
        return res.status(404).json({ message: "Country not found" });
      }

      res.status(200).json({ country });
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
      console.log("country controller getAll");
      const countries = await CountryManager.getAllCountry();
      console.log(countries);
      res.status(200).json({ countries });
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
      const countryId: string = req.params.id;
      const fieldsToUpdate: Partial<CountryType> = req.body;

      const updatedCountry = await CountryManager.updateCountry(
        countryId,
        fieldsToUpdate
      );

      if (!updatedCountry) {
        return res.status(404).json({ message: "Country not found" });
      }

      res.status(200).json({ updatedCountry });
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
      const countryId: string = req.params.id;
      const deletedCountry = await CountryManager.deleteCountry(countryId);

      if (!deletedCountry) {
        return res.status(404).json({ message: "Country not found" });
      }

      res.status(200).json({ deletedCountry });
    } catch (error) {
      console.error(error);
      res.status(500).json({ err: "Internal Server Error" });
      next(error);
    }
  }
}
