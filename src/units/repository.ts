import LevelsModel from "../levels/model.js";
import UnitsModel from "./model.js";

export default class UnitsRepository {
    static async createUnit(unit: Partial<UnitsType>): Promise<UnitsType> {
        try {

            const newUnit = await UnitsModel.create(unit);
            return newUnit;
        } catch (err) {
            throw new Error(`Error repo createUnit: ${err}`);
        }
    }

    static async getUnitById(unitId: string): Promise<UnitsType | null> {
        try {

            const unit = await UnitsModel.findById(unitId);
            console.log("Units repo", unitId);
            return unit;
        } catch (err) {
            throw new Error(`Error repo getUnitById: ${err}`);
        }
    }

    static async getsLevelsByUnitId(unitId: string): Promise<LevelsType[] | undefined | null> {
        try {
            const unit = await UnitsModel.findById(unitId);
            if (unit) {
                const levelsIds = unit.levels;

                const levelsDetails = await LevelsModel.find({ _id: { $in: levelsIds } });

                if (levelsIds) {
                    const levelsInOrder = levelsIds.map((id: any) => levelsDetails.find(level => level._id.equals(id)));

                    console.log("courses repo getUnitsById", unitId);
                    return levelsInOrder as LevelsType[];
                }
            }
            else return null
        } catch (err) {
            throw new Error(`Error repo getsLevelsByUnitId: ${err}`);
        }
    }


    static async getAllUnits(): Promise<UnitsType[] | null> {
        try {

            const units = await UnitsModel.find({});
            return units;
        } catch (err) {
            throw new Error(`Error repo getAllUnits: ${err}`);
        }
    }

    static async updateUnit(
        unitId: string,
        fieldsToUpdate: Partial<UnitsType>
    ): Promise<UnitsType | null> {
        try {

            const updatedUnit = await UnitsModel.findByIdAndUpdate(
                unitId,
                fieldsToUpdate,
                { new: true }
            );
            return updatedUnit;
        } catch (err) {
            throw new Error(`Error repo updateUnit: ${err}`);
        }
    }

    static async deleteUnit(unitId: string): Promise<UnitsType | null> {
        try {

            const status = await UnitsModel.findOneAndDelete({ _id: unitId });
            return status;
        } catch (err) {
            throw new Error(`Error repo deleteUnit: ${err}`);
        }
    }
}
