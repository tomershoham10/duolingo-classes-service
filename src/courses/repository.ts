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

    static async getNextUnitId(pervUnitId: string): Promise<string | null> {
        try {
            const course = await CoursesModel.findOne({ units: { $in: [pervUnitId] } });
            console.log("courses repo - getNextUnitId :", course);
            if (course) {
                const unitsIds = course.units;
                if (unitsIds && unitsIds.length !== unitsIds.indexOf(pervUnitId) + 1) {
                    const nextUnitId = unitsIds[unitsIds.indexOf(pervUnitId) + 1];
                    if (nextUnitId) {
                        return nextUnitId;
                    } else {
                        return null;
                    }
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

    static async getUnitsByCourseId(courseId: string): Promise<UnitsType[] | null> {
        try {
            const course = await CoursesModel.findById(courseId);
            console.log("courses repo - getUnitsByCourseId - course", course);

            if (course) {
                const unitsIds = course.units;
                console.log("courses repo - getUnitsByCourseId - unitsIds", unitsIds);
                const unitsDetails = await UnitsModel.find({ _id: { $in: unitsIds } });

                // const unitsInOrder = unitsIds.map(id => unitsDetails.find(unit => unit._id === id));

                console.log("courses repo getUnitsById - unitsDetails", unitsDetails);
                return unitsDetails as UnitsType[];
            }
            else return null
        }
        catch (error: any) {
            console.error('Repository Error:', error.message);
            throw new Error(`Course repo - getUnitsByCourseId: ${error}`);
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
