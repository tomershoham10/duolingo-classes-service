import UnitsManager from "./manager.js";
import mongoose from "mongoose";
import UnitsModel from "./model.js";
import CoursesModel from "../courses/model.js";
// import CoursesRepository from "../courses/repository.js";
export default class UnitsController {
    static async create(req, res) {
        try {
            const { guidebook, description } = req.body;
            const reqUnit = {};
            if (guidebook) {
                reqUnit.guidebook = guidebook;
            }
            if (description) {
                reqUnit.description = description;
            }
            const newUnit = await UnitsManager.createUnit(reqUnit);
            if (!!newUnit) {
                return res.status(201).json({ message: "unit created successfully", newUnit });
            }
            else {
                throw new Error('unit controller create error.');
            }
        }
        catch (error) {
            console.error('Controller Error:', error.message);
            res.status(400).json({ error: error.message });
        }
    }
    static async createByCourse(req, res) {
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
            course.units ? course.units.push(newUnit._id.toString()) : course.units = [newUnit._id.toString()];
            // const updatedCourse = await CoursesRepository.updateCourse(course._id, { units: course.units })
            await newUnit.save({ session: session });
            await course.save({ session: session });
            await session.commitTransaction();
            session.endSession();
            res.status(200).json({ message: 'New unit created and course updated successfully' });
        }
        catch (error) {
            console.error('Controller Error:', error.message);
            res.status(400).json({ error: error.message });
        }
    }
    static async getById(req, res) {
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
            console.error('Controller Error:', error.message);
            res.status(500).json({ error: error.message });
        }
    }
    static async getLevelsById(req, res) {
        try {
            const unitId = req.params.id;
            console.log("units controller: getLevelsById", unitId);
            const levels = await UnitsManager.getsLevelsByUnitId(unitId);
            if (!levels) {
                return res.status(404).json({ message: "units not found" });
            }
            res.status(200).json({ levels });
        }
        catch (error) {
            console.error('Controller Error:', error.message);
            res.status(500).json({ error: error.message });
        }
    }
    static async getNextLevelId(req, res) {
        try {
            const prevLevelId = req.params.prevLevelId;
            console.log("units controller: getNextLevelId", prevLevelId);
            const nextLevelId = await UnitsManager.getNextLevelId(prevLevelId);
            if (!nextLevelId) {
                return res.status(404).json({ message: "nextLevelId not found" });
            }
            res.status(200).json({ nextLevelId });
        }
        catch (error) {
            console.error('Controller Error:', error.message);
            res.status(500).json({ error: error.message });
        }
    }
    static async getMany(_req, res) {
        try {
            const units = await UnitsManager.getAllUnits();
            console.log(units);
            res.status(200).json({ units });
        }
        catch (error) {
            console.error('Controller Error:', error.message);
            res.status(500).json({ error: error.message });
        }
    }
    static async update(req, res) {
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
            console.error('Controller Error:', error.message);
            res.status(500).json({ error: error.message });
        }
    }
    static async delete(req, res) {
        try {
            const unitId = req.params.id;
            const status = await UnitsManager.deleteUnit(unitId);
            if (!status) {
                return res.status(404).json({ message: "Unit not found" });
            }
            res.status(200).json({ status });
        }
        catch (error) {
            console.error('Controller Error:', error.message);
            res.status(500).json({ error: error.message });
        }
    }
}
//# sourceMappingURL=controller.js.map