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

    static async deleteCourse(courseId: string): Promise<CoursesType | null> {
        const status = await CoursesModel.findOneAndDelete({ _id: courseId });
        return status;
    }
}
