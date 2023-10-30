import UnitsModel from "../units/model.js";
import CoursesModel from "./model.js";

export default class CoursesRepository {
    static async createCourse(course: Partial<CoursesType>): Promise<CoursesType> {
        const newCourse = await CoursesModel.create(course);
        return newCourse;
    }

    static async getCourseById(courseId: string): Promise<CoursesType | null> {
        const course = await CoursesModel.findById(courseId);
        console.log("courses repo", courseId);
        return course;
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
        const courses = await CoursesModel.find({});
        return courses;
    }

    static async updateCourse(
        courseId: string,
        fieldsToUpdate: Partial<CoursesType>
    ): Promise<CoursesType | null> {
        const updatedCourse = await CoursesModel.findByIdAndUpdate(
            courseId,
            fieldsToUpdate,
            { new: true }
        );
        return updatedCourse;
    }

    static async deleteCourses(courseId: string): Promise<CoursesType | null> {
        const status = await CoursesModel.findOneAndDelete({ _id: courseId });
        return status;
    }
}
