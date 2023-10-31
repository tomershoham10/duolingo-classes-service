import UnitsModel from "../units/model.js";
import CoursesModel from "./model.js";

export default class CoursesRepository {
    static async createCourse(course: Partial<CoursesType>): Promise<CoursesType> {
        try {

            const newCourse = await CoursesModel.create(course);
            return newCourse;
        }
        catch (err) {
            throw new Error(`Error repo createCourse: ${err}`);
        }
    }

    static async getCourseById(courseId: string): Promise<CoursesType | null> {
        try {

            const course = await CoursesModel.findById(courseId);
            console.log("courses repo", courseId);
            return course;
        }
        catch (err) {
            throw new Error(`Error repo getCourseById: ${err}`);
        }
    }

    static async getUnitsByCourseId(courseId: string): Promise<UnitsType[] | null> {
        try {
            const course = await CoursesModel.findById(courseId);
            if (course) {
                const unitsIds = course.units;

                const unitsDetails = await UnitsModel.find({ _id: { $in: unitsIds } });

                const unitsInOrder = unitsIds.map(id => unitsDetails.find(unit => unit._id.equals(id)));

                console.log("courses repo getUnitsById", courseId);
                return unitsInOrder as UnitsType[];
            }
            else return null
        } catch (err) {
            throw new Error(`Error fetching units for the course: ${err}`);
        }
    }


    static async getAllCourses(): Promise<CoursesType[] | null> {
        try {
            const courses = await CoursesModel.find({});
            return courses;
        }
        catch (err) {
            throw new Error(`Error repo getAllCourses: ${err}`);
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
        catch (err) {
            throw new Error(`Error repo updateCourse: ${err}`);
        }
    }

    static async deleteCourses(courseId: string): Promise<CoursesType | null> {
        try {

            const status = await CoursesModel.findOneAndDelete({ _id: courseId });
            return status;
        } catch (err) {
            throw new Error(`Error repo deleteCourses: ${err}`);
        }
    }
}
