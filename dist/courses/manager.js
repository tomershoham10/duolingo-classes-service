import CoursesRepository from "./repository.js";
export default class CoursesManager {
    static async createCourse(course) {
        try {
            const response = await CoursesRepository.createCourse(course);
            return response;
        }
        catch (err) {
            console.error(err);
        }
    }
    static async getCourseById(courseId) {
        try {
            const course = await CoursesRepository.getCourseById(courseId);
            console.log("courses manager", course);
            return course;
        }
        catch (err) {
            console.error(err);
        }
    }
    static async getCourseByType(courseType) {
        try {
            const course = await CoursesRepository.getCourseByType(courseType);
            console.log("courses manager - getCourseByType :", course);
            return course;
        }
        catch (err) {
            console.error(err);
        }
    }
    static async getUnitsByCourseId(courseId) {
        try {
            const units = await CoursesRepository.getUnitsByCourseId(courseId);
            console.log("courses manager getUnitsByCourseId", units);
            return units;
        }
        catch (err) {
            console.error(err);
        }
    }
    static async getAllCourses() {
        try {
            const courses = await CoursesRepository.getAllCourses();
            return courses;
        }
        catch (err) {
            console.error(err);
        }
    }
    static async updateCourse(courseId, filedsToUpdate) {
        const updatedCourse = await CoursesRepository.updateCourse(courseId, filedsToUpdate);
        try {
            return updatedCourse;
        }
        catch (err) {
            console.error(err);
        }
    }
    static async deleteCourses(courseId) {
        try {
            const status = await CoursesRepository.deleteCourses(courseId);
            return status;
        }
        catch (err) {
            console.error(err);
        }
    }
}
//# sourceMappingURL=manager.js.map