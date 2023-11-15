import UnitsModel from "../units/model.js";
import CoursesModel from "./model.js";
export default class CoursesRepository {
    static async createCourse(course) {
        try {
            const newCourse = await CoursesModel.create(course);
            return newCourse;
        }
        catch (err) {
            throw new Error(`Error repo createCourse: ${err}`);
        }
    }
    static async getCourseById(courseId) {
        try {
            const course = await CoursesModel.findById(courseId);
            console.log("courses repo", courseId);
            return course;
        }
        catch (err) {
            throw new Error(`Error repo getCourseById: ${err}`);
        }
    }
    static async getCourseByType(courseType) {
        try {
            const course = await CoursesModel.findOne({ type: courseType });
            console.log("courses repo - getCourseByType :", course);
            return course;
        }
        catch (err) {
            throw new Error(`Error repo getCourseByType: ${err}`);
        }
    }
    static async getUnitsByCourseId(courseId) {
        try {
            const course = await CoursesModel.findById(courseId);
            console.log("courses repo - getUnitsByCourseId - course", course);
            if (course) {
                const unitsIds = course.units;
                console.log("courses repo - getUnitsByCourseId - unitsIds", unitsIds);
                const unitsDetails = await UnitsModel.find({ _id: { $in: unitsIds } });
                // const unitsInOrder = unitsIds.map(id => unitsDetails.find(unit => unit._id === id));
                console.log("courses repo getUnitsById - unitsDetails", unitsDetails);
                return unitsDetails;
            }
            else
                return null;
        }
        catch (err) {
            throw new Error(`Error fetching units for the course: ${err}`);
        }
    }
    static async getAllCourses() {
        try {
            const courses = await CoursesModel.find({});
            return courses;
        }
        catch (err) {
            throw new Error(`Error repo getAllCourses: ${err}`);
        }
    }
    static async updateCourse(courseId, fieldsToUpdate) {
        try {
            const updatedCourse = await CoursesModel.findByIdAndUpdate(courseId, fieldsToUpdate, { new: true });
            return updatedCourse;
        }
        catch (err) {
            throw new Error(`Error repo updateCourse: ${err}`);
        }
    }
    static async deleteCourses(courseId) {
        try {
            const status = await CoursesModel.findOneAndDelete({ _id: courseId });
            return status;
        }
        catch (err) {
            throw new Error(`Error repo deleteCourses: ${err}`);
        }
    }
}
//# sourceMappingURL=repository.js.map