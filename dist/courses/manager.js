import CoursesRepository from "./repository.js";
export default class CoursesManager {
    static async createCourse(course) {
        const response = await CoursesRepository.createCourse(course);
        return response;
    }
    static async getCourseById(courseId) {
        const course = await CoursesRepository.getCourseById(courseId);
        console.log("courses manager", course);
        return course;
    }
    static async getAllCourses() {
        const courses = await CoursesRepository.getAllCourses();
        return courses;
    }
    static async updateCourse(courseId, filedsToUpdate) {
        const updatedCourse = await CoursesRepository.updateCourse(courseId, filedsToUpdate);
        return updatedCourse;
    }
    static async deleteCourse(courseId) {
        const status = await CoursesRepository.deleteCourse(courseId);
        return status;
    }
}
//# sourceMappingURL=manager.js.map