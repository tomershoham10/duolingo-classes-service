import mongoose from "mongoose";
import UnitsRepository from "./repository.js";
import LevelsManager from "../levels/manager.js";
import UnitsModel from "./model.js";
import LessonsModel from "../lessons/model.js";
import LevelsModel from "../levels/model.js";
import { getFromCache, resetNamespaceCache, setToCache } from "../utils/cache.js";
export default class UnitsManager {
    static async createUnit(unit) {
        const session = await mongoose.startSession();
        session.startTransaction();
        try {
            const createdLevel = await LevelsManager.createLevel();
            console.log("createUnit manager - createdLevel", createdLevel);
            const createdUnit = await UnitsRepository.createUnit({ ...unit, levels: [createdLevel._id] });
            await resetNamespaceCache('getAllUnits', 'allUnits');
            await session.commitTransaction();
            return createdUnit;
        }
        catch (error) {
            await session.abortTransaction();
            console.error('Manager Error [createUnit]:', error.message);
            throw new Error('Error in unit creation process');
        }
        finally {
            session.endSession();
        }
    }
    static async getUnitById(unitId) {
        try {
            const cachedUnit = await getFromCache('units', unitId);
            if (cachedUnit) {
                console.log("Cache hit: units manager - getUnitById", unitId);
                return JSON.parse(cachedUnit); // Parse cached JSON data
            }
            const unit = await UnitsRepository.getUnitById(unitId);
            unit !== null ? await setToCache('units', unitId, JSON.stringify(unit), 3600) : null;
            console.log("units manager", unit);
            return unit;
        }
        catch (error) {
            console.error('Manager Error [getUnitById]:', error.message);
            throw new Error('Error in getUnitById');
        }
    }
    static async getsLevelsByUnitId(unitId) {
        try {
            const cachedLevels = await getFromCache('getsLevelsByUnitId', unitId);
            if (cachedLevels) {
                console.log("Cache hit: units manager - getsLevelsByUnitId", unitId);
                return JSON.parse(cachedLevels); // Parse cached JSON data
            }
            const levels = await UnitsRepository.getsLevelsByUnitId(unitId);
            await setToCache('getsLevelsByUnitId', unitId, JSON.stringify(levels), 3600);
            console.log("units manager getsLevelsByUnitId", levels);
            return levels;
        }
        catch (error) {
            console.error('Manager Error [getsLevelsByUnitId]:', error.message);
            throw new Error('Error in getsLevelsByUnitId');
        }
    }
    static async getUnsuspendedLevelsByUnitId(unitId) {
        try {
            const cachedLevels = await getFromCache('getUnsuspendedLevelsByUnitId', unitId);
            if (cachedLevels) {
                console.log("Cache hit: units manager - getUnsuspendedLevelsByUnitId", unitId);
                return JSON.parse(cachedLevels); // Parse cached JSON data
            }
            const levels = await UnitsRepository.getUnsuspendedLevelsByUnitId(unitId);
            await setToCache('getUnsuspendedLevelsByUnitId', unitId, JSON.stringify(levels), 3600);
            console.log("units manager getUnsuspendedLevelsByUnitId", levels);
            return levels;
        }
        catch (error) {
            console.error('Manager Error [getUnsuspendedLevelsByUnitId]:', error.message);
            throw new Error('Error in getUnsuspendedLevelsByUnitId');
        }
    }
    static async getNextLevelId(prevLevelId) {
        try {
            const cachedNextLevelId = await getFromCache('getNextLevelId', prevLevelId);
            if (cachedNextLevelId) {
                console.log("Cache hit: units manager - getNextLevelId", cachedNextLevelId);
                return JSON.parse(cachedNextLevelId); // Parse cached JSON data
            }
            const nextLevelId = await UnitsRepository.getNextLevelId(prevLevelId);
            await setToCache('getNextLevelId', prevLevelId, JSON.stringify(nextLevelId), 3600);
            console.log("units manager getNextLevelId", nextLevelId);
            return nextLevelId;
        }
        catch (error) {
            console.error('Manager Error [getNextLevelId]:', error.message);
            throw new Error('Error in getNextLevelId');
        }
    }
    static async getAllUnits() {
        try {
            const cachedUnits = await getFromCache('getAllUnits', 'allUnits');
            if (cachedUnits) {
                console.log("Cache hit: units manager - getAllUnits", cachedUnits);
                return JSON.parse(cachedUnits); // Parse cached JSON data
            }
            const units = await UnitsRepository.getAllUnits();
            await setToCache('getAllUnits', 'allUnits', JSON.stringify(units), 3600);
            return units;
        }
        catch (error) {
            console.error('Manager Error [getAllUnits]:', error.message);
            throw new Error('Error in getAllUnits');
        }
    }
    static async updateUnit(unitId, filedsToUpdate) {
        try {
            const updatedUnit = await UnitsRepository.updateUnit(unitId, filedsToUpdate);
            await setToCache('units', unitId, JSON.stringify(updatedUnit), 3600);
            await resetNamespaceCache('getAllUnits', 'allUnits');
            return updatedUnit;
        }
        catch (error) {
            console.error('Manager Error [updateUnit]:', error.message);
            throw new Error('Error in updateUnit');
        }
    }
    static async createNewLevel(unitId) {
        try {
            const session = await mongoose.startSession();
            session.startTransaction();
            const unit = await UnitsModel.findById(unitId);
            if (!!!unit) {
                await session.abortTransaction();
                session.endSession();
                return null;
            }
            const newLesson = await LessonsModel.create({ exercises: [] });
            const newLevel = await LevelsModel.create({ lessons: [newLesson._id] });
            const updatedUnit = await UnitsRepository.updateUnit(unitId, { levels: [...unit.levels, newLevel._id] });
            console.log('updatedUnit', updatedUnit);
            await setToCache('units', unitId, JSON.stringify(updatedUnit), 3600);
            await resetNamespaceCache('getAllUnits', 'allUnits');
            await newLesson.save({ session: session });
            await newLevel.save({ session: session });
            await session.commitTransaction();
            session.endSession();
            console.log('end session');
            return updatedUnit;
        }
        catch (error) {
            console.error('Manager Error [updateUnit]:', error.message);
            throw new Error('Error in updateUnit');
        }
    }
    // static async createNewLevel2(unitId: string): Promise<UnitsType | null> {
    //     let session: ClientSession | null = null;
    //     try {
    //         session = await mongoose.startSession();
    //         session.startTransaction();
    //         const unit = await UnitsModel.findById(unitId).session(session);
    //         if (!unit) {
    //             throw new Error('Unit not found');
    //         }
    //         const newLesson = await LessonsRepository.createLesson({ exercises: [] });
    //         const newLevel = await LevelsRepository.createLevel({ lessons: [newLesson._id] });
    //         const updatedUnit = await UnitsRepository.updateUnit(
    //             unitId,
    //             { levels: [...unit.levels, newLevel._id] }
    //         );
    //         await session.commitTransaction();
    //         return updatedUnit;
    //     } catch (error:any) {
    //         if (session) {
    //             await session.abortTransaction();
    //         }
    //         console.error('Error in createNewLevel:', error.message);
    //         throw new Error('Error in createNewLevel');
    //     } finally {
    //         if (session) {
    //             session.endSession();
    //         }
    //     }
    // }
    static async suspendLevelByUnitId(unitId, levelId) {
        try {
            const updatedUnit = await UnitsRepository.suspendLevelByUnitId(unitId, levelId);
            await setToCache('units', unitId, JSON.stringify(updatedUnit), 3600);
            await resetNamespaceCache('getAllUnits', 'allUnits');
            return updatedUnit;
        }
        catch (error) {
            console.error('Manager Error [suspendLevelByUnitId]:', error.message);
            throw new Error('Error in suspendLevelByUnitId');
        }
    }
    static async unsuspendLevelByUnitId(unitId, levelId) {
        try {
            const updatedUnit = await UnitsRepository.unsuspendLevelByUnitId(unitId, levelId);
            await setToCache('units', unitId, JSON.stringify(updatedUnit), 3600);
            await resetNamespaceCache('getAllUnits', 'allUnits');
            return updatedUnit;
        }
        catch (error) {
            console.error('Manager Error [unsuspendLevelByUnitId]:', error.message);
            throw new Error('Error in unsuspendLevelByUnitId');
        }
    }
    static async deleteUnit(unitId) {
        try {
            const status = await UnitsRepository.deleteUnit(unitId);
            await resetNamespaceCache('units', unitId);
            await resetNamespaceCache('getAllUnits', 'allUnits');
            return status;
        }
        catch (error) {
            console.error('Manager Error [deleteUnit]:', error.message);
            throw new Error('Error in deleteUnit');
        }
    }
}
//# sourceMappingURL=manager.js.map