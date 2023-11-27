import CoursesRepository from "./repository.js";

export default class CoursesManager {
    static async createCourse(
        course: Partial<CoursesType>): Promise<CoursesType | undefined> {
        try {
            const response = await CoursesRepository.createCourse(course);
            return response
        } catch (err) {
            console.error(err);
            throw new Error(`course manager - createCourse ${err}`);
        }
    }

    static async getCourseById(courseId: string): Promise<CoursesType | null | undefined> {
        try {
            const course = await CoursesRepository.getCourseById(courseId);
            console.log("courses manager", course);
            return course;
        } catch (err) {
            console.error(err);
            throw new Error(`course manager - getCourseById ${err}`);
        }
    }

    static async getCourseByType(courseType: TypesOfCourses): Promise<CoursesType | null | undefined> {
        try {
            const course = await CoursesRepository.getCourseByType(courseType);
            console.log("courses manager - getCourseByType :", course);
            return course;
        } catch (err) {
            console.error(err);
            throw new Error(`course manager - getCourseByType ${err}`);
        }
    }

    static async getUnitsByCourseId(courseId: string): Promise<UnitsType[] | null | undefined> {
        try {
            const units = await CoursesRepository.getUnitsByCourseId(courseId);
            console.log("courses manager getUnitsByCourseId", units);
            return units;
        } catch (err) {
            console.error(err);
            throw new Error(`course manager - getUnitsByCourseId ${err}`);
        }
    }

    static async getNextUnitId(pervUnitId: string): Promise<string | null> {
        try {
            const nextUnitId = await CoursesRepository.getNextUnitId(pervUnitId);
            console.log("courses manager getNextUnitId", nextUnitId);
            if (nextUnitId) {
                return nextUnitId;
            } else return null;
        } catch (err) {
            console.error(err);
            throw new Error(`course manager - getNextUnitId ${err}`)
        }
    }

    static async getAllCourses(): Promise<CoursesType[] | null | undefined> {
        try {
            const courses = await CoursesRepository.getAllCourses();
            return courses;
        } catch (err) {
            console.error(err);
            throw new Error(`course manager - getAllCourses ${err}`);
        }
    }

    static async updateCourse(
        courseId: string,
        filedsToUpdate: Partial<CoursesType>
    ): Promise<CoursesType | null | undefined> {
        const updatedCourse = await CoursesRepository.updateCourse(
            courseId,
            filedsToUpdate
        );
        try {
            return updatedCourse;
        } catch (err) {
            console.error(err);
            throw new Error(`course manager - updateCourse ${err}`);
        }
    }

    static async deleteCourses(courseId: string): Promise<CoursesType | null | undefined> {
        try {

            const status = await CoursesRepository.deleteCourses(courseId);
            return status;
        } catch (err) {
            console.error(err);
            throw new Error(`course manager - deleteCourses ${err}`);
        }
    }
}
