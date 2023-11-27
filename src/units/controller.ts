import Express, { NextFunction } from "express";
import UnitsManager from "./manager.js";
import mongoose from "mongoose";
import UnitsModel from "./model.js";
import CoursesModel from "../courses/model.js";

export default class UnitsController {
    static async create(
        req: Express.Request,
        res: Express.Response,
        next: NextFunction
    ) {
        try {
            const { levels, guidebook, description } = req.body as {
                levels: string[],
                guidebook?: string,
                description?: string
            };


            const reqUnit: {
                levels: string[],
                guidebook?: string,
                description?: string
            } = {
                levels,
            };

            if (guidebook) {
                reqUnit.guidebook = guidebook;
            }

            if (description) {
                reqUnit.description = description;
            }

            const newUnit = await UnitsManager.createUnit(reqUnit);
            res.status(201)
                .json({ message: "Unit created successfully", newUnit });
        } catch (error) {
            console.error(error);
            res.status(500).json({ err: "Internal Server Error" });
            next(error);
        }
    }

    static async createByCourse(
        req: Express.Request,
        res: Express.Response,
        next: NextFunction
    ) {
        const { unitData, courseId } = req.body as { unitData: Partial<UnitsType>, courseId: string };
        try {
            const session = await mongoose.startSession();
            session.startTransaction();

            console.log("controller - createByCourse", courseId, unitData);
            const course = await CoursesModel.findById(courseId);
            console.log(course);
            if (!course) {
                await session.abortTransaction();
                session.endSession();
                return res.status(404).json({ message: 'Course not found' });
            }

            const newUnit = new UnitsModel(unitData);

            course.units.push(newUnit._id.toString());

            await newUnit.save({ session: session });
            await course.save({ session: session });
            await session.commitTransaction();
            session.endSession();
            res.status(200).json({ message: 'New unit created and course updated successfully' });


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
            const unitId: string = req.params.id;
            console.log("units controller", unitId);
            const unit = await UnitsManager.getUnitById(unitId);
            if (!unit) {
                return res.status(404).json({ message: "unit not found" });
            }

            res.status(200).json({ unit });
        } catch (error) {
            console.error(error);
            res.status(500).json({ err: "Internal Server Error" });
            next(error);
        }
    }

    static async getLevelsById(
        req: Express.Request,
        res: Express.Response,
        next: NextFunction
    ) {
        try {
            const unitId: string = req.params.id;
            console.log("units controller: getLevelsById", unitId);
            const levels = await UnitsManager.getsLevelsByUnitId(unitId);
            if (!levels) {
                return res.status(404).json({ message: "units not found" });
            }

            res.status(200).json({ levels });
        } catch (error) {
            console.error(error);
            res.status(500).json({ err: "Internal Server Error" });
            next(error);
        }
    }

    static async getNextLevelId(
        req: Express.Request,
        res: Express.Response,
        next: NextFunction
    ) {
        try {
            const pervLevelId: string = req.params.pervLevelId;
            console.log("units controller: getNextLevelId", pervLevelId);
            const nextLevelId = await UnitsManager.getNextLevelId(pervLevelId);
            if (!nextLevelId) {
                return res.status(404).json({ message: "nextLevelId not found" });
            }

            res.status(200).json({ nextLevelId });
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
            const units = await UnitsManager.getAllUnits();
            console.log(units);
            res.status(200).json({ units });
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
            const unitId: string = req.params.id;
            const fieldsToUpdate: Partial<UnitsType> = req.body;

            const updatedUnit = await UnitsManager.updateUnit(
                unitId,
                fieldsToUpdate
            );

            if (!updatedUnit) {
                return res.status(404).json({ message: "unit not found" });
            }

            res.status(200).json({ updatedUnit });
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
            const unitId: string = req.params.id;
            const status = await UnitsManager.deleteUnit(unitId);

            if (!status) {
                return res.status(404).json({ message: "Unit not found" });
            }

            res.status(200).json({ status });
        } catch (error) {
            console.error(error);
            res.status(500).json({ err: "Internal Server Error" });
            next(error);
        }
    }
}
