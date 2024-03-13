import mongoose from "mongoose";
import UnitsRepository from "./repository.js";
import LevelsManager from "../levels/manager.js";

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
        const updatedUnit = await UnitsRepository.updateUnit(
            unitId,
            filedsToUpdate
        );
        try {
            return updatedUnit;
        }
        catch (error: any) {
            console.error('Manager Error [updateUnit]:', error.message);
            throw new Error('Error in updateUnit');
        }
    }

    static async suspendLevelByUnitId(unitId: string, levelId: string): Promise<UnitsType | null> {
        const updatedUnit = await UnitsRepository.suspendLevelByUnitId(
            unitId,
            levelId
        );
        try {
            return updatedUnit;
        }
        catch (error: any) {
            console.error('Manager Error [suspendLevelByUnitId]:', error.message);
            throw new Error('Error in suspendLevelByUnitId');
        }
    }

    static async deleteUnit(unitId: string): Promise<UnitsType | null | undefined> {
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
