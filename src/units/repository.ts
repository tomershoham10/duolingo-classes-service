import UnitsModel from "./model.js";

export default class UnitsRepository {
    static async createUnit(unit: Partial<UnitsType>): Promise<UnitsType> {
        const newUnit = await UnitsModel.create(unit);
        return newUnit;
    }

    static async getUnitById(unitId: string): Promise<UnitsType | null> {
        const unit = await UnitsModel.findById(unitId);
        console.log("Units repo", unitId);
        return unit;
    }

    static async getAllUnits(): Promise<UnitsType[] | null> {
        const units = await UnitsModel.find({});
        return units;
    }

    static async updateUnit(
        unitId: string,
        fieldsToUpdate: Partial<UnitsType>
    ): Promise<UnitsType | null> {
        const updatedUnit = await UnitsModel.findByIdAndUpdate(
            unitId,
            fieldsToUpdate,
            { new: true }
        );
        return updatedUnit;
    }

    static async deleteUnit(unitId: string): Promise<UnitsType | null> {
        const status = await UnitsModel.findOneAndDelete({ _id: unitId });
        return status;
    }
}
