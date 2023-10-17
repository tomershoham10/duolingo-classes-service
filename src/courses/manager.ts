import CoursesRepository from "./repository.js";

export default class CoursesManager {
    static async createCourse(
        course: Partial<CoursesType>): Promise<CoursesType> {
        const response = await CoursesRepository.createCourse(course);
        return response
    }

    static async getCourseById(courseId: string): Promise<CoursesType | null> {
        const course = await CoursesRepository.getCourseById(courseId);
        console.log("courses manager", course);
        return course;
    }

    static async getAllCourses(): Promise<CoursesType[] | null> {
        const courses = await CoursesRepository.getAllCourses();
        return courses;
    }

    static async updateCourse(
        courseId: string,
        filedsToUpdate: Partial<CoursesType>
    ): Promise<CoursesType | null> {
        const updatedCourse = await CoursesRepository.updateCourse(
            courseId,
            filedsToUpdate
        );
        return updatedCourse;
    }

    static async deleteCourse(courseId: string): Promise<CoursesType | null> {
        const status = await CoursesRepository.deleteCourse(courseId);
        return status;
    }
}
