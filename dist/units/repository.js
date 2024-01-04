import CoursesManager from "../courses/manager.js";
import LevelsModel from "../levels/model.js";
import UnitsModel from "./model.js";
export default class UnitsRepository {
    static async createUnit(unit) {
        try {
            const newUnit = await UnitsModel.create(unit);
            return newUnit;
        }
        catch (error) {
            if (error.name === 'ValidationError') {
                console.error('Repository Validation Error:', error.message);
                throw new Error('Validation error while creating unit');
            }
            else if (error.code === 11000) {
                console.error('Repository Duplicate Key Error:', error.message);
                throw new Error('Duplicate key error while creating unit');
            }
            else {
                console.error('Repository Error:', error.message);
                throw new Error('Error creating unit');
            }
        }
    }
    static async getUnitById(unitId) {
        try {
            const unit = await UnitsModel.findById(unitId);
            console.log("Units repo", unitId);
            return unit;
        }
        catch (err) {
            throw new Error(`Error repo getUnitById: ${err}`);
        }
    }
    static async getsLevelsByUnitId(unitId) {
        try {
            const unit = await UnitsModel.findById(unitId);
            if (unit) {
                const levelsIds = unit.levels;
                if (levelsIds) {
                    const levelsDetails = await LevelsModel.find({ _id: { $in: levelsIds } });
                    console.log("units repo - getsLevelsByUnitId unit, levelsId, levelsDetails", unit, levelsIds, levelsDetails);
                    // const levelsInOrder = levelsIds.map((id: any) => levelsDetails.find(level => level._id === id));
                    // console.log("courses repo getUnitsById", unitId);
                    return levelsDetails;
                }
            }
            else
                return null;
        }
        catch (error) {
            console.error('Repository Error:', error.message);
            throw new Error(`Units repo - getsLevelsByUnitId: ${error}`);
        }
    }
    static async getNextLevelId(pervLevelId) {
        try {
            const unit = await UnitsModel.findOne({ levels: { $in: [pervLevelId] } });
            console.log("units repo - getNextLevelId - unit", unit);
            if (unit) {
                const levelsIds = unit.levels;
                if (levelsIds) {
                    const pervLevelIdIndex = levelsIds.indexOf(pervLevelId);
                    if (pervLevelIdIndex + 1 !== levelsIds.length) {
                        return levelsIds[pervLevelIdIndex + 1];
                    }
                    else {
                        const response = await CoursesManager.getNextUnitId(unit._id);
                        if (response) {
                            if (response === "finished") {
                                return response;
                            }
                            else {
                                const nextUnit = await UnitsModel.findById(response);
                                if (nextUnit && nextUnit.levels) {
                                    const nextLevelnId = nextUnit.levels[0];
                                    return nextLevelnId;
                                }
                                else
                                    return null;
                            }
                        }
                        else
                            return null;
                    }
                    ;
                }
                else
                    return null;
            }
            else
                return null;
        }
        catch (error) {
            console.error('Repository Error:', error.message);
            throw new Error(`Units repo - getsLevelsByUnitId: ${error}`);
        }
    }
    static async getAllUnits() {
        try {
            const units = await UnitsModel.find({});
            return units;
        }
        catch (error) {
            console.error('Repository Error:', error.message);
            throw new Error(`Units repo - getsLevelsByUnitId: ${error}`);
        }
    }
    static async updateUnit(unitId, fieldsToUpdate) {
        try {
            const updatedUnit = await UnitsModel.findByIdAndUpdate(unitId, fieldsToUpdate, { new: true });
            return updatedUnit;
        }
        catch (error) {
            console.error('Repository Error:', error.message);
            throw new Error(`Units repo - getsLevelsByUnitId: ${error}`);
        }
    }
    static async deleteUnit(unitId) {
        try {
            const status = await UnitsModel.findOneAndDelete({ _id: unitId });
            return status;
        }
        catch (error) {
            console.error('Repository Error:', error.message);
            throw new Error(`Units repo - getsLevelsByUnitId: ${error}`);
        }
    }
}
//# sourceMappingURL=repository.js.map