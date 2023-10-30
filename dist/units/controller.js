import UnitsManager from "./manager.js";
import mongoose from "mongoose";
import UnitsModel from "./model.js";
import CoursesModel from "../courses/model.js";
export default class UnitsController {
    static async create(req, res, next) {
        try {
            const { sections, guidebook, description } = req.body;
            const reqUnit = {
                sections,
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
        }
        catch (error) {
            console.error(error);
            next(error);
        }
    }
    static async createByCourse(req, res, next) {
        const { unitData, courseId } = req.body;
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
        }
        catch (error) {
            console.error(error);
            next(error);
        }
    }
    static async getById(req, res, next) {
        try {
            const unitId = req.params.id;
            console.log("units controller", unitId);
            const unit = await UnitsManager.getUnitById(unitId);
            if (!unit) {
                return res.status(404).json({ message: "unit not found" });
            }
            res.status(200).json({ unit });
        }
        catch (error) {
            next(error);
        }
    }
    static async getMany(_req, res, next) {
        try {
            const units = await UnitsManager.getAllUnits();
            console.log(units);
            res.status(200).json({ units });
        }
        catch (err) {
            next(err);
            res.status(500).json({ err: "Internal Server Error" });
        }
    }
    static async update(req, res, next) {
        try {
            const unitId = req.params.id;
            const fieldsToUpdate = req.body;
            const updatedUnit = await UnitsManager.updateUnit(unitId, fieldsToUpdate);
            if (!updatedUnit) {
                return res.status(404).json({ message: "unit not found" });
            }
            res.status(200).json({ updatedUnit });
        }
        catch (error) {
            next(error);
        }
    }
    static async delete(req, res, next) {
        try {
            const unitId = req.params.id;
            const status = await UnitsManager.deleteUnit(unitId);
            if (!status) {
                return res.status(404).json({ message: "Section not found" });
            }
            res.status(200).json({ status });
        }
        catch (error) {
            next(error);
        }
    }
}
//# sourceMappingURL=controller.js.map