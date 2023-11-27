import UnitsRepository from "./repository.js";
export default class UnitsManager {
    static async createUnit(unit) {
        try {
            const response = await UnitsRepository.createUnit(unit);
            return response;
        }
        catch (err) {
            throw new Error(`Error manager createUnit: ${err}`);
        }
    }
    static async getUnitById(unitId) {
        try {
            const unit = await UnitsRepository.getUnitById(unitId);
            console.log("units manager", unit);
            return unit;
        }
        catch (err) {
            throw new Error(`Error manager getUnitById: ${err}`);
        }
    }
    static async getsLevelsByUnitId(unitId) {
        try {
            const units = await UnitsRepository.getsLevelsByUnitId(unitId);
            console.log("units manager getsLevelsByUnitId", units);
            return units;
        }
        catch (err) {
            throw new Error(`Error manager getsLevelsByUnitId: ${err}`);
        }
    }
    static async getNextLevelId(pervLevelId) {
        try {
            const nextLevelId = await UnitsRepository.getNextLevelId(pervLevelId);
            console.log("units manager getNextLevelId", nextLevelId);
            return nextLevelId;
        }
        catch (err) {
            throw new Error(`Error manager getNextLevelId: ${err}`);
        }
    }
    static async getAllUnits() {
        try {
            const units = await UnitsRepository.getAllUnits();
            return units;
        }
        catch (err) {
            throw new Error(`Error manager getAllUnits: ${err}`);
        }
    }
    static async updateUnit(unitId, filedsToUpdate) {
        const updatedunit = await UnitsRepository.updateUnit(unitId, filedsToUpdate);
        try {
            return updatedunit;
        }
        catch (err) {
            throw new Error(`Error manager updateUnit: ${err}`);
        }
    }
    static async deleteUnit(unitId) {
        try {
            const status = await UnitsRepository.deleteUnit(unitId);
            return status;
        }
        catch (err) {
            throw new Error(`Error manager deleteUnit: ${err}`);
        }
    }
}
//# sourceMappingURL=manager.js.map