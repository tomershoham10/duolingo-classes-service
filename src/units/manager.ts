import UnitsRepository from "./repository.js";

export default class UnitsManager {
    static async createUnit(
        unit: Partial<UnitsType>): Promise<UnitsType | undefined> {
        try {
            const response = await UnitsRepository.createUnit(unit);
            return response
        }
        catch (err) {
            throw new Error(`Error manager createUnit: ${err}`);
        }
    }

    static async getUnitById(unitId: string): Promise<UnitsType | null | undefined> {
        try {
            const unit = await UnitsRepository.getUnitById(unitId);
            console.log("units manager", unit);
            return unit;
        }
        catch (err) {
            throw new Error(`Error manager getUnitById: ${err}`);
        }
    }

    static async getsLevelsByUnitId(unitId: string): Promise<LevelsType[] | null | undefined> {
        try {
            const units = await UnitsRepository.getsLevelsByUnitId(unitId);
            console.log("units manager getsLevelsByUnitId", units);
            return units;
        }
        catch (err) {
            throw new Error(`Error manager getsLevelsByUnitId: ${err}`);
        }
    }

    static async getAllUnits(): Promise<UnitsType[] | null | undefined> {
        try {
            const units = await UnitsRepository.getAllUnits();
            return units;
        }
        catch (err) {
            throw new Error(`Error manager getAllUnits: ${err}`);
        }
    }

    static async updateUnit(
        unitId: string,
        filedsToUpdate: Partial<UnitsType>
    ): Promise<UnitsType | null | undefined> {
        const updatedunit = await UnitsRepository.updateUnit(
            unitId,
            filedsToUpdate
        );
        try {
            return updatedunit;
        }
        catch (err) {
            throw new Error(`Error manager updateUnit: ${err}`);
        }
    }

    static async deleteUnit(unitId: string): Promise<UnitsType | null | undefined> {
        try {
            const status = await UnitsRepository.deleteUnit(unitId);
            return status;
        }
        catch (err) {
            throw new Error(`Error manager deleteUnit: ${err}`);
        }
    }
}
