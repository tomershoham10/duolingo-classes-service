import Express, { NextFunction } from "express";
import unitsManager from "./manager.js";

export default class UintsController {
    static async create(
        req: Express.Request,
        res: Express.Response,
        next: NextFunction
    ) {
        try {
            const { sections, guidebook } = req.body as {
                sections: string[],
                guidebook?: string
            };


            const reqUnit: {
                sections: string[],
                guidebook?: string
            } = {
                sections,
            };

            if (guidebook) {
                reqUnit.guidebook = guidebook;
            }

            const newUnit = await unitsManager.createUnit(reqUnit);
            res.status(201)
                .json({ message: "Unit created successfully", newUnit });
        } catch (error) {
            next(error);
        }
    }

    static async getById(
        req: Express.Request,
        res: Express.Response,
        next: NextFunction
    ) {
        try {
            const unitId: string = req.params.id;
            console.log("units controller", unitId);
            const unit = await unitsManager.getUnitById(unitId);
            if (!unit) {
                return res.status(404).json({ message: "unit not found" });
            }

            res.status(200).json({ unit });
        } catch (error) {
            next(error);
        }
    }

    static async getMany(
        _req: Express.Request,
        res: Express.Response,
        next: NextFunction
    ) {
        try {
            const units = await unitsManager.getAllUnits();
            console.log(units);
            res.status(200).json({ units });
        } catch (err) {
            next(err);
            res.status(500).json({ err: "Internal Server Error" });
        }
    }

    static async update(
        req: Express.Request,
        res: Express.Response,
        next: NextFunction
    ) {
        try {
            const unitId: string = req.params.id;
            const fieldsToUpdate: Partial<UnitsType> = req.body;

            const updatedUnit = await unitsManager.updateUnit(
                unitId,
                fieldsToUpdate
            );

            if (!updatedUnit) {
                return res.status(404).json({ message: "unit not found" });
            }

            res.status(200).json({ updatedUnit });
        } catch (error) {
            next(error);
        }
    }

    static async delete(
        req: Express.Request,
        res: Express.Response,
        next: NextFunction
    ) {
        try {
            const unitId: string = req.params.id;
            const status = await unitsManager.deleteUnit(unitId);

            if (!status) {
                return res.status(404).json({ message: "Section not found" });
            }

            res.status(200).json({ status });
        } catch (error) {
            next(error);
        }
    }
}
