import mongoose from "mongoose";
import UnitsRepository from "./repository.js";
import LevelsManager from "../levels/manager.js";
import UnitsModel from "./model.js";
import LessonsModel from "../lessons/model.js";
import LevelsModel from "../levels/model.js";

export default class UnitsManager {
    static async createUnit(
        unit: Partial<UnitsType>): Promise<UnitsType> {
        const session = await mongoose.startSession();
        session.startTransaction();
        try {
            const createdLevel = await LevelsManager.createLevel();
            console.log("createUnit manager - createdLevel", createdLevel);
            const createdUnit = await UnitsRepository.createUnit({ ...unit, levels: [createdLevel._id] });
            await session.commitTransaction();
            return createdUnit
        }
        catch (error: any) {
            await session.abortTransaction();
            console.error('Manager Error [createUnit]:', error.message);
            throw new Error('Error in unit creation process');
        }
        finally {
            session.endSession();
        }
    }

    static async getUnitById(unitId: string): Promise<UnitsType | null | undefined> {
        try {
            const unit = await UnitsRepository.getUnitById(unitId);
            console.log("units manager", unit);
            return unit;
        }
        catch (error: any) {
            console.error('Manager Error [getUnitById]:', error.message);
            throw new Error('Error in getUnitById');
        }
    }

    static async getsLevelsByUnitId(unitId: string): Promise<LevelsType[]> {
        try {
            const units = await UnitsRepository.getsLevelsByUnitId(unitId);
            console.log("units manager getsLevelsByUnitId", units);
            return units;
        }
        catch (error: any) {
            console.error('Manager Error [getsLevelsByUnitId]:', error.message);
            throw new Error('Error in getsLevelsByUnitId');
        }
    }

    static async getUnsuspendedLevelsByUnitId(unitId: string): Promise<LevelsType[]> {
        try {
            const units = await UnitsRepository.getUnsuspendedLevelsByUnitId(unitId);
            console.log("units manager getUnsuspendedLevelsByUnitId", units);
            return units;
        }
        catch (error: any) {
            console.error('Manager Error [getUnsuspendedLevelsByUnitId]:', error.message);
            throw new Error('Error in getUnsuspendedLevelsByUnitId');
        }
    }

    static async getNextLevelId(prevLevelId: string): Promise<string | null> {
        try {
            const nextLevelId = await UnitsRepository.getNextLevelId(prevLevelId);
            console.log("units manager getNextLevelId", nextLevelId);
            return nextLevelId;
        }
        catch (error: any) {
            console.error('Manager Error [getNextLevelId]:', error.message);
            throw new Error('Error in getNextLevelId');
        }
    }

    static async getAllUnits(): Promise<UnitsType[]> {
        try {
            const units = await UnitsRepository.getAllUnits();
            return units;
        }
        catch (error: any) {
            console.error('Manager Error [getAllUnits]:', error.message);
            throw new Error('Error in getAllUnits');
        }
    }

    static async updateUnit(
        unitId: string,
        filedsToUpdate: Partial<UnitsType>
    ): Promise<UnitsType | null> {
        try {
            const updatedUnit = await UnitsRepository.updateUnit(
                unitId,
                filedsToUpdate
            );
            return updatedUnit;
        }
        catch (error: any) {
            console.error('Manager Error [updateUnit]:', error.message);
            throw new Error('Error in updateUnit');
        }
    }



    static async createNewLevel(unitId: string): Promise<UnitsType | null> {
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

            const updatedUnit = await UnitsRepository.updateUnit(
                unitId,
                { levels: [...unit.levels, newLevel._id] }
            );
            console.log('updatedUnit', updatedUnit);

            await newLesson.save({ session: session });
            await newLevel.save({ session: session });
            await session.commitTransaction();
            session.endSession();
            console.log('end session');
            return updatedUnit;
        }
        catch (error: any) {
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

    static async suspendLevelByUnitId(unitId: string, levelId: string): Promise<UnitsType | null> {
        try {
            const updatedUnit = await UnitsRepository.suspendLevelByUnitId(
                unitId,
                levelId
            );
            return updatedUnit;
        }
        catch (error: any) {
            console.error('Manager Error [suspendLevelByUnitId]:', error.message);
            throw new Error('Error in suspendLevelByUnitId');
        }
    }

    static async unsuspendLevelByUnitId(unitId: string, levelId: string): Promise<UnitsType | null> {
        try {
            const updatedUnit = await UnitsRepository.unsuspendLevelByUnitId(
                unitId,
                levelId
            );
            return updatedUnit;
        }
        catch (error: any) {
            console.error('Manager Error [unsuspendLevelByUnitId]:', error.message);
            throw new Error('Error in unsuspendLevelByUnitId');
        }
    }

    static async deleteUnit(unitId: string): Promise<UnitsType | null> {
        try {
            const status = await UnitsRepository.deleteUnit(unitId);
            return status;
        }
        catch (error: any) {
            console.error('Manager Error [deleteUnit]:', error.message);
            throw new Error('Error in deleteUnit');
        }
    }
}
