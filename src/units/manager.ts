import UnitsRepository from "./repository.js";

export default class UnitsManager {
    static async createUnit(
        unit: Partial<UnitsType>): Promise<UnitsType> {
        const response = await UnitsRepository.createUnit(unit);
        return response
    }

    static async getUnitById(unitId: string): Promise<UnitsType | null> {
        const unit = await UnitsRepository.getUnitById(unitId);
        console.log("units manager", unit);
        return unit;
    }

    static async getAllUnits(): Promise<UnitsType[] | null> {
        const units = await UnitsRepository.getAllUnits();
        return units;
    }

    static async updateUnit(
        unitId: string,
        filedsToUpdate: Partial<UnitsType>
    ): Promise<UnitsType | null> {
        const updatedunit = await UnitsRepository.updateUnit(
            unitId,
            filedsToUpdate
        );
        return updatedunit;
    }

    static async deleteUnit(unitId: string): Promise<UnitsType | null> {
        const status = await UnitsRepository.deleteUnit(unitId);
        return status;
    }
}
