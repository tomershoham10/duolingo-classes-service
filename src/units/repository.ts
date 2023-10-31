import SectionsModel from "../sections/model.js";
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

    static async getsSectionsByUnitId(unitId: string): Promise<SectionsType[] | undefined | null> {
        try {
            const unit = await UnitsModel.findById(unitId);
            if (unit) {
                const sectionsIds = unit.sections;

                const sectionsDetails = await SectionsModel.find({ _id: { $in: sectionsIds } });

                if (sectionsIds) {
                    const sectionsInOrder = sectionsIds.map((id: any) => sectionsDetails.find(section => section._id.equals(id)));

                    console.log("courses repo getUnitsById", unitId);
                    return sectionsInOrder as SectionsType[];
                }
            }
            else return null
        } catch (err) {
            throw new Error(`Error repo getsSectionsByUnitId: ${err}`);
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
