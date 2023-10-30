import UnitsModel from "../units/model.js";
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
    static async getUnitsByCourseId(courseId) {
        try {
            const course = await CoursesModel.findById(courseId);
            if (course) {
                const unitsIds = course.units;
                const unitsDetails = await UnitsModel.find({ _id: { $in: unitsIds } });
                const unitsInOrder = unitsIds.map(id => unitsDetails.find(unit => unit._id.equals(id)));
                console.log("courses repo getUnitsById", courseId);
                return unitsInOrder;
            }
            else
                return null;
        }
        catch (err) {
            throw new Error(`Error fetching units for the course: ${err}`);
        }
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