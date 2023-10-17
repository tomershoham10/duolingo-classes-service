import UnitsRepository from "./repository.js";
export default class unitsManager {
    static async createUnit(unit) {
        const response = await UnitsRepository.createUnit(unit);
        return response;
    }
    static async getUnitById(unitId) {
        const unit = await UnitsRepository.getUnitById(unitId);
        console.log("units manager", unit);
        return unit;
    }
    static async getAllUnits() {
        const units = await UnitsRepository.getAllUnits();
        return units;
    }
    static async updateUnit(unitId, filedsToUpdate) {
        const updatedunit = await UnitsRepository.updateUnit(unitId, filedsToUpdate);
        return updatedunit;
    }
    static async deleteUnit(unitId) {
        const status = await UnitsRepository.deleteUnit(unitId);
        return status;
    }
}
//# sourceMappingURL=manager.js.map