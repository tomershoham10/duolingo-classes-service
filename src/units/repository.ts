import CoursesManager from "../courses/manager.js";
import LevelsModel from "../levels/model.js";
import UnitsModel from "./model.js";

export default class UnitsRepository {
    static async createUnit(unit: Partial<UnitsType>): Promise<UnitsType> {
        try {

            const newUnit = await UnitsModel.create(unit);
            return newUnit;
        } catch (error: any) {
            if (error.name === 'ValidationError') {
                console.error('Repository Validation Error:', error.message);
                throw new Error('Validation error while creating unit');
            } else if (error.code === 11000) {
                console.error('Repository Duplicate Key Error:', error.message);
                throw new Error('Duplicate key error while creating unit');
            } else {
                console.error('Repository Error:', error.message);
                throw new Error('Error creating unit');
            }
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

    static async getsLevelsByUnitId(unitId: string): Promise<LevelsType[]> {
        try {
            const unit = await UnitsModel.findById(unitId);
            if (unit) {
                const levelsIds = unit.levels;
                console.log('repo - getsLevelsByUnitId: levelsIds', levelsIds)
                const unSuspendLevelsIds = levelsIds.filter(levelId => !unit.suspendedLevels.includes(levelId));
                console.log('repo - getsLevelsByUnitId: unSuspendLevelsIds', unit.suspendedLevels, unSuspendLevelsIds)
                if (unSuspendLevelsIds.length > 0) {

                    const levelsDetails = await LevelsModel.find({ _id: { $in: unSuspendLevelsIds } });
                    console.log("units repo - getsLevelsByUnitId unit, levelsId, levelsDetails", unit, levelsIds, levelsDetails)
                    const levelsInOrder = levelsDetails.sort((a, b) => {
                        const aIndex = levelsIds.indexOf(a._id);
                        const bIndex = levelsIds.indexOf(b._id);
                        return aIndex - bIndex;
                    });

                    console.log("courses repo getUnitsById - levelsInOrder", levelsInOrder);
                    return levelsInOrder as LevelsType[];
                }
                else return [];
            }
            else return [];
        } catch (error: any) {
            console.error('Repository Error:', error.message);
            throw new Error(`Units repo - getsLevelsByUnitId: ${error}`);
        }
    }

    // static async getsLevelsByUnitId(unitId: string): Promise<LevelsType[]> {
    //     try {
    //         const result = await UnitsModel.aggregate([
    //             { $match: { _id: unitId } },  // Match the unit by unitId
    //             { $unwind: '$levels' },
    //             {
    //                 $lookup: {
    //                     from: 'levels', // The collection name for LevelsModel
    //                     localField: 'levels',
    //                     foreignField: '_id',
    //                     as: 'levelDetails'
    //                 }
    //             },
    //             { $unwind: '$levelDetails' }

    //             // { $unwind: "$levelsInOrder" },  // Unwind the filtered levels array
    //             // {
    //             //     $lookup: {
    //             //         from: "levels",  // The name of the levels collection
    //             //         localField: "levelsInOrder",
    //             //         foreignField: "_id",
    //             //         as: "levelDetails"
    //             //     }
    //             // },
    //             // { $unwind: "$levelDetails" },  // Unwind the level details array
    //             // { $sort: { "levels.index": 1 } },  // Sort based on the original order in the levels array
    //             // {
    //             //     $group: {
    //             //         _id: "$_id",
    //             //         levelsInOrder: { $push: "$levelDetails" }
    //             //     }
    //             // }
    //         ]);
    //         console.log('getsLevelsByUnitId', result);
    //         if (result.length > 0) {
    //             console.log('getsLevelsByUnitId aggregate', result[0]);
    //             return result[0].levelsInOrder as LevelsType[];
    //         } else {
    //             return [];
    //         }
    //     } catch (error: any) {
    //         console.error('Repository Error:', error.message);
    //         throw new Error(`Units repo - getsLevelsByUnitId: ${error}`);
    //     }
    // }

    static async getUnsuspendedLevelsByUnitId(unitId: string): Promise<LevelsType[]> {
        try {
            const unit = await UnitsModel.findById(unitId);
            console.log("courses repo - getUnsuspendedUnitsByCourseId - unit", unit);
            if (unit) {
                const levelsIds = unit.levels;
                console.log('repo - getUnsuspendedUnitsByCourseId: levelsIds', levelsIds)
                const unSuspendLevelsIds = levelsIds.filter(levelId => !unit.suspendedLevels.includes(levelId));
                console.log('repo - getUnsuspendedLevelsByUnitId: unSuspendLevelsIds', unit.suspendedLevels, unSuspendLevelsIds)
                if (unSuspendLevelsIds.length > 0) {

                    const levelsDetails = await LevelsModel.find({ _id: { $in: unSuspendLevelsIds } });
                    console.log("units repo - getsLevelsByUnitId unit, levelsId, levelsDetails", unit, levelsIds, levelsDetails)
                    return levelsDetails as LevelsType[];
                }
                else return [];
            }
            else return [];
        } catch (error: any) {
            console.error('Repository Error:', error.message);
            throw new Error(`Units repo - getsLevelsByUnitId: ${error}`);
        }
    }

    static async getNextLevelId(prevLevelId: string): Promise<string | null> {
        try {
            const unit = await UnitsModel.findOne({ levels: { $in: [prevLevelId] } });
            console.log("units repo - getNextLevelId - unit", unit);
            if (unit) {
                const levelsIds = unit.levels;
                if (levelsIds) {
                    const prevLevelIdIndex = levelsIds.indexOf(prevLevelId);
                    if (prevLevelIdIndex !== -1 && prevLevelIdIndex + 1 !== levelsIds.length) {
                        const nextLevelId = levelsIds[levelsIds.indexOf(prevLevelId) + 1];
                        if (unit.suspendedLevels.includes(nextLevelId)) {
                            await this.getNextLevelId(nextLevelId);
                        }
                        return nextLevelId;
                    }
                    else {
                        const response = await CoursesManager.getNextUnitId(unit._id);
                        if (response) {
                            if (response === "finished") {
                                return response;
                            } else {
                                const nextUnit = await UnitsModel.findById(response);
                                if (nextUnit && nextUnit.levels) {
                                    const nextLevelnId = nextUnit.levels[0];
                                    if (nextUnit.suspendedLevels.includes(nextLevelnId)) {
                                        await this.getNextLevelId(nextLevelnId);
                                    }
                                    return nextLevelnId;
                                }
                                else return null;
                            }
                        }
                        else return null;
                    };
                }
                else return null;
            }
            else return null;
        } catch (error: any) {
            console.error('Repository Error:', error.message);
            throw new Error(`Units repo - getsLevelsByUnitId: ${error}`);
        }
    }

    static async getAllUnits(): Promise<UnitsType[]> {
        try {

            const units = await UnitsModel.find({});
            return units;
        } catch (error: any) {
            console.error('Repository Error:', error.message);
            throw new Error(`Units repo - getsLevelsByUnitId: ${error}`);
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
        } catch (error: any) {
            console.error('Repository Error:', error.message);
            throw new Error(`Units repo - getsLevelsByUnitId: ${error}`);
        }
    }


    static async suspendLevelByUnitId(unitId: string, levelId: string): Promise<UnitsType | null> {
        try {
            const unit = await UnitsModel.findById(unitId);
            if (!!!unit) { return null };

            const suspendedLevels = unit.suspendedLevels;
            if (suspendedLevels.includes(levelId)) { return null };
            const updatedUnit = await UnitsModel.findByIdAndUpdate(
                unitId,
                { suspendedLevels: [...suspendedLevels, levelId] },
                { new: true }
            );
            return updatedUnit;
        } catch (error: any) {
            console.error('Repository Error:', error.message);
            throw new Error(`Units repo - suspendLevelByUnitId: ${error}`);
        }
    }

    static async unsuspendLevelByUnitId(unitId: string, levelId: string): Promise<UnitsType | null> {
        try {
            const unit = await UnitsModel.findById(unitId);
            if (!!!unit) { return null };

            const suspendedLevels = unit.suspendedLevels;
            if (!suspendedLevels.includes(levelId)) { return null };
            const updatedUnit = await UnitsModel.findByIdAndUpdate(
                unitId,
                { suspendedLevels: suspendedLevels.filter(level => level !== levelId) },
                { new: true }
            );
            return updatedUnit;
        } catch (error: any) {
            console.error('Repository Error:', error.message);
            throw new Error(`Units repo - unsuspendLevelByUnitId: ${error}`);
        }
    }

    static async deleteUnit(unitId: string): Promise<UnitsType | null> {
        try {

            const status = await UnitsModel.findOneAndDelete({ _id: unitId });
            return status;
        } catch (error: any) {
            console.error('Repository Error:', error.message);
            throw new Error(`Units repo - getsLevelsByUnitId: ${error}`);
        }
    }
}
