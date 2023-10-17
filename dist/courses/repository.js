import CoursesModel from "./model.js";
export default class CoursesRepository {
    static async createCourse(course) {
        const newCourse = await CoursesModel.create(course);
        return newCourse;
    }
    static async getCourseById(courseId) {
        const course = await CoursesModel.findById(courseId);
        console.log("courses repo", courseId);
        return course;
    }
    static async getAllCourses() {
        const courses = await CoursesModel.find({});
        return courses;
    }
    static async updateCourse(courseId, fieldsToUpdate) {
        const updatedCourse = await CoursesModel.findByIdAndUpdate(courseId, fieldsToUpdate, { new: true });
        return updatedCourse;
    }
    static async deleteCourses(courseId) {
        const status = await CoursesModel.findOneAndDelete({ _id: courseId });
        return status;
    }
}
//# sourceMappingURL=repository.js.map