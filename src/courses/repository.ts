import mongoose from "mongoose";
import UnitsModel from "../units/model.js";
import CoursesModel from "./model.js";

export default class CoursesRepository {
    static async createCourse(course: Partial<CoursesType>): Promise<CoursesType> {
        try {
            const newCourse = await CoursesModel.create(course);
            return newCourse;
        }
        catch (error: any) {
            if (error.name === 'ValidationError') {
                console.error('Repository Validation Error:', error.message);
                throw new Error('Validation error while creating course');
            } else if (error.code === 11000) {
                console.error('Repository Duplicate Key Error:', error.message);
                throw new Error('Duplicate key error while creating course');
            } else {
                console.error('Repository Error:', error.message);
                throw new Error('Error creating course');
            }
        }
    }

    static async getCourseById(courseId: string): Promise<CoursesType | null> {
        try {

            const course = await CoursesModel.findById(courseId);
            console.log("courses repo", courseId);
            return course;
        }
        catch (error: any) {
            console.error('Repository Error:', error.message);
            throw new Error(`Course repo - getCourseById: ${error}`);
        }
    }

    static async getCourseByName(courseName: string): Promise<CoursesType | null> {
        try {

            const course = await CoursesModel.findOne({ name: courseName });
            console.log("courses repo", courseName, course);
            return course;
        }
        catch (error: any) {
            console.error('Repository Error:', error.message);
            throw new Error(`Course repo - getCourseByName: ${error}`);
        }
    }

    // static async getUnitsByCourseId(courseId: string): Promise<UnitsType[]> {
    //     try {
    //         const course = await CoursesModel.findById(courseId);
    //         console.log("courses repo - getUnitsByCourseId - course", course);

    //         if (course) {
    //             const unitsIds = course.unitsIds;
    //             console.log("courses repo - getUnitsByCourseId - unitsIds", unitsIds);
    //             const unitsDetails = await UnitsModel.find({ _id: { $in: unitsIds } });

    //             const unitsInOrder = unitsDetails.sort((a, b) => {
    //                 const aIndex = unitsIds.indexOf(a._id);
    //                 const bIndex = unitsIds.indexOf(b._id);
    //                 return aIndex - bIndex;
    //             });
    //             console.log("courses repo getUnitsById - unitsInOrder", unitsInOrder);
    //             return unitsInOrder as UnitsType[];
    //         }
    //         else return [];
    //     }
    //     catch (error: any) {
    //         console.error('Repository Error:', error.message);
    //         throw new Error(`Course repo - getUnitsByCourseId: ${error}`);
    //     }
    // }


    static async getCourseDataById(courseId: string): Promise<any[] | null> {
        try {
            const course = await CoursesModel.findById(courseId);
            if (!!course) {
                const objId = new mongoose.Types.ObjectId(courseId);
                const courseData = await CoursesModel.aggregate([
                    { $match: { _id: objId } },
                    {
                        $lookup: {
                            from: "units",
                            let: { unitsIds: "$unitsIds" },
                            pipeline: [
                                { $match: { $expr: { $in: ["$_id", { $map: { input: "$$unitsIds", as: "id", in: { $toObjectId: "$$id" } } }] } } },
                                {
                                    $lookup: {
                                        from: "levels",
                                        let: { levelsIds: "$levelsIds" },
                                        pipeline: [
                                            { $match: { $expr: { $in: ["$_id", { $map: { input: "$$levelsIds", as: "id", in: { $toObjectId: "$$id" } } }] } } },
                                            {
                                                $lookup: {
                                                    from: "lessons",
                                                    let: { lessonsIds: "$lessonsIds" },
                                                    pipeline: [
                                                        { $match: { $expr: { $in: ["$_id", { $map: { input: "$$lessonsIds", as: "id", in: { $toObjectId: "$$id" } } }] } } },
                                                        {
                                                            $lookup: {
                                                                from: "exercises",
                                                                let: { exercisesIds: "$exercisesIds" },
                                                                pipeline: [
                                                                    { $match: { $expr: { $in: ["$_id", { $map: { input: "$$exercisesIds", as: "id", in: { $toObjectId: "$$id" } } }] } } }
                                                                ],
                                                                as: "exercises"
                                                            }
                                                        }
                                                    ],
                                                    as: "lessons"
                                                }
                                            }
                                        ],
                                        as: "levels"
                                    }
                                }
                            ],
                            as: "units"
                        }
                    }
                ]);
                // db.courses.aggregate([ { $match: { _id: ObjectId("6671586ac22d39e30de3cbe0") } }, { $lookup: { from: "units", localField: "unitsIds", foreignField: "_id", as: "unitsData" } } ])

                // const objId = new mongoose.Types.ObjectId(courseId);
                // const courseData = await CoursesModel.aggregate().match({ _id: new mongoose.Types.ObjectId("6671586ac22d39e30de3cbe0") }).lookup(
                //     {
                //         from: "units",
                //         localField: "unitsIds",
                //         foreignField: "_id",
                //         as: "unitsData"
                //     }
                // );
                console.log('Aggregated course data:', courseData);
                return courseData;
            }
            return null;
        }
        catch (error: any) {
            console.error('Repository Error:', error.message);
            return null;
        }
    }



    static async getUnsuspendedUnitsByCourseId(courseId: string): Promise<UnitsType[]> {
        try {
            const course = await CoursesModel.findById(courseId);
            console.log("courses repo - getUnsuspendedUnitsByCourseId - course", course);

            if (course) {
                const unitsIds = course.unitsIds;
                console.log("courses repo - getUnsuspendedUnitsByCourseId - unitsIds", unitsIds);
                const unsuspendedUnitsIds = unitsIds.filter(unitId => !course.suspendedUnitsIds.includes(unitId));
                console.log("courses repo - getUnsuspendedUnitsByCourseId - unsuspendedUnitsIds", unsuspendedUnitsIds);
                const unitsDetails = await UnitsModel.find({ _id: { $in: unsuspendedUnitsIds } });

                // const unitsInOrder = unitsIds.map(id => unitsDetails.find(unit => unit._id === id));

                console.log("courses repo getUnsuspendedUnitsByCourseId - unitsDetails", unitsDetails);
                return unitsDetails as UnitsType[];
            }
            else return []
        }
        catch (error: any) {
            console.error('Repository Error:', error.message);
            throw new Error(`Course repo - getUnitsByCourseId: ${error}`);
        }
    }

    static async getNextUnitId(prevUnitId: string): Promise<string | null> {
        try {
            const course = await CoursesModel.findOne({ units: { $in: [prevUnitId] } });
            console.log("courses repo - getNextUnitId :", course);
            if (course) {
                const unitsIds = course.unitsIds;
                const indexOfUnit = unitsIds.indexOf(prevUnitId);
                if (indexOfUnit !== -1 && indexOfUnit + 1 < unitsIds.length) {
                    const nextUnitId = unitsIds[unitsIds.indexOf(prevUnitId) + 1];
                    if (course.suspendedUnitsIds.includes(nextUnitId)) {
                        await this.getNextUnitId(nextUnitId);
                    }
                    return nextUnitId;
                } else return "finished";
            } else {
                return null;
            }
        }
        catch (error: any) {
            console.error('Repository Error:', error.message);
            throw new Error(`Course repo - getNextUnitId: ${error}`);
        }
    }

    static async getAllCourses(): Promise<CoursesType[]> {
        try {
            const courses = await CoursesModel.find({});
            return courses;
        }
        catch (error: any) {
            console.error('Repository Error:', error.message);
            throw new Error(`Course repo - getAllCourses: ${error}`);
        }
    }

    static async updateCourse(
        courseId: string,
        fieldsToUpdate: Partial<CoursesType>
    ): Promise<CoursesType | null> {
        try {

            const updatedCourse = await CoursesModel.findByIdAndUpdate(
                courseId,
                fieldsToUpdate,
                { new: true }
            );
            return updatedCourse;
        }
        catch (error: any) {
            console.error('Repository Error:', error.message);
            throw new Error(`Course repo - updateCourse: ${error}`);
        }
    }

    static async suspendUnitByCourseId(courseId: string, unitId: string): Promise<CoursesType | null> {
        try {
            const course = await CoursesModel.findById(courseId);
            if (!!!course) { return null };

            const suspendedUnits = course.suspendedUnitsIds;
            if (suspendedUnits.includes(unitId)) { return null };

            const updatedCourse = await CoursesModel.findByIdAndUpdate(
                courseId,
                { suspendedUnits: [...suspendedUnits, unitId] },
                { new: true }
            );
            return updatedCourse;
        }
        catch (error: any) {
            console.error('Repository Error:', error.message);
            throw new Error(`Course repo - suspendUnitByCourseId: ${error}`);
        }
    }

    static async unsuspendUnitByCourseId(courseId: string, unitId: string): Promise<CoursesType | null> {
        try {
            const course = await CoursesModel.findById(courseId);
            if (!!!course) { return null };

            const suspendedUnitsIds = course.suspendedUnitsIds;
            if (!suspendedUnitsIds.includes(unitId)) { return null };

            const updatedCourse = await CoursesModel.findByIdAndUpdate(
                courseId,
                { suspendedUnitsIds: suspendedUnitsIds.filter(unit => unit !== unitId) },
                { new: true }
            );
            return updatedCourse;
        }
        catch (error: any) {
            console.error('Repository Error:', error.message);
            throw new Error(`Course repo - unsuspendUnitByCourseId: ${error}`);
        }
    }

    static async deleteCourse(courseId: string): Promise<CoursesType | null> {
        try {

            const status = await CoursesModel.findOneAndDelete({ _id: courseId });
            return status;
        } catch (error: any) {
            console.error('Repository Error:', error.message);
            throw new Error(`Course repo - deleteCourses: ${error}`);
        }
    }
}
