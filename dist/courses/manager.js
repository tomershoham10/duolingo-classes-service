import CoursesRepository from "./repository.js";
export default class CoursesManager {
    static async createCourse(course) {
        try {
            const response = await CoursesRepository.createCourse(course);
            return response;
        }
        catch (err) {
            console.error(err);
            throw new Error(`course manager - createCourse ${err}`);
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
            throw new Error(`course manager - getCourseById ${err}`);
        }
    }
    static async getCourseByName(courseName) {
        try {
            const course = await CoursesRepository.getCourseByName(courseName);
            console.log("courses manager", course);
            return course;
        }
        catch (err) {
            console.error(err);
            throw new Error(`course manager - getCourseById ${err}`);
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
            throw new Error(`course manager - getUnitsByCourseId ${err}`);
        }
    }
    static async getNextUnitId(pervUnitId) {
        try {
            const nextUnitId = await CoursesRepository.getNextUnitId(pervUnitId);
            console.log("courses manager getNextUnitId", nextUnitId);
            if (nextUnitId) {
                return nextUnitId;
            }
            else
                return null;
        }
        catch (err) {
            console.error(err);
            throw new Error(`course manager - getNextUnitId ${err}`);
        }
    }
    static async getAllCourses() {
        try {
            const courses = await CoursesRepository.getAllCourses();
            return courses;
        }
        catch (err) {
            console.error(err);
            throw new Error(`course manager - getAllCourses ${err}`);
        }
    }
    static async updateCourse(courseId, filedsToUpdate) {
        const updatedCourse = await CoursesRepository.updateCourse(courseId, filedsToUpdate);
        try {
            return updatedCourse;
        }
        catch (err) {
            console.error(err);
            throw new Error(`course manager - updateCourse ${err}`);
        }
    }
    static async deleteCourses(courseId) {
        try {
            const status = await CoursesRepository.deleteCourses(courseId);
            return status;
        }
        catch (err) {
            console.error(err);
            throw new Error(`course manager - deleteCourses ${err}`);
        }
    }
}
//# sourceMappingURL=manager.js.map