import UnitsModel from "./model.js";
export default class UnitsRepository {
    static async createUnit(unit) {
        const newUnit = await UnitsModel.create(unit);
        return newUnit;
    }
    static async getUnitById(unitId) {
        const unit = await UnitsModel.findById(unitId);
        console.log("Units repo", unitId);
        return unit;
    }
    static async getAllUnits() {
        const units = await UnitsModel.find({});
        return units;
    }
    static async updateUnit(unitId, fieldsToUpdate) {
        const updatedUnit = await UnitsModel.findByIdAndUpdate(unitId, fieldsToUpdate, { new: true });
        return updatedUnit;
    }
    static async deleteUnit(unitId) {
        const status = await UnitsModel.findOneAndDelete({ _id: unitId });
        return status;
    }
}
//# sourceMappingURL=repository.js.map