import mongoose from "mongoose";
import CoursesRepository from "./repository.js";
import UnitsManager from "../units/manager.js";
import UnitsRepository from "../units/repository.js";
import LevelsRepository from "../levels/repository.js";

export default class CoursesManager {
    static async createCourse(courseName: string): Promise<CoursesType | undefined> {
        const session = await mongoose.startSession();
        session.startTransaction();
        try {
            const createdUnit = await UnitsManager.createUnit({});
            console.log("createCourse manager - createdUnit", createdUnit);
            const createdCourse = await CoursesRepository.createCourse({ name: courseName, units: [createdUnit._id] });
            await session.commitTransaction();
            return createdCourse;
        } catch (error: any) {
            await session.abortTransaction();
            console.error('Manager Error [createCourse]:', error.message);
            throw new Error('Error in course creation process');
        } finally {
            session.endSession();
        }
    }

    static async getCourseById(courseId: string): Promise<CoursesType | null> {
        try {
            const course = await CoursesRepository.getCourseById(courseId);
            console.log("courses manager", course);
            return course;
        } catch (error: any) {
            console.error('Manager Error [getCourseById]:', error.message);
            throw new Error('Error in getCourseById');
        }
    }

    static async getCourseByName(courseName: string): Promise<CoursesType | null> {
        try {
            const course = await CoursesRepository.getCourseByName(courseName);
            console.log("courses manager", course);
            return course;
        } catch (error: any) {
            console.error('Manager Error [getCourseById]:', error.message);
            throw new Error('Error in getting course by id');
        }
    }

    static async getUnitsByCourseId(courseId: string): Promise<UnitsType[]> {
        try {
            const units = await CoursesRepository.getUnitsByCourseId(courseId);
            console.log("courses manager getUnitsByCourseId", units);
            return units;
        } catch (error: any) {
            console.error('Manager Error [getUnitsByCourseId]:', error.message);
            throw new Error('Error in getting units by course id');
        }
    }

    static async getUnsuspendedUnitsByCourseId(courseId: string): Promise<UnitsType[]> {
        try {
            const units = await CoursesRepository.getUnsuspendedUnitsByCourseId(courseId);
            console.log("courses manager getUnsuspendedUnitsByCourseId", units);
            return units;
        } catch (error: any) {
            console.error('Manager Error [getUnsuspendedUnitsByCourseId]:', error.message);
            throw new Error('Error in getting unsuspended units by course id');
        }
    }

    static async getFirstLessonId(courseId: string): Promise<string | null> {
        try {
            const units = await CoursesRepository.getUnsuspendedUnitsByCourseId(courseId);
            if (units.length > 0) {
                const firstUnitId = units[0]._id;
                const levels = await UnitsRepository.getUnsuspendedLevelsByUnitId(firstUnitId);
                if (levels.length > 0) {
                    const firstLevelId = levels[0]._id;
                    const lessons = await LevelsRepository.getsLessonsByLevelId(firstLevelId);
                    return lessons.length > 0 ? lessons[0]._id : null;
                }
            }
            return null;
        } catch (error: any) {
            console.error('Manager Error [getFirstLessonId]:', error.message);
            throw new Error('Error in getFirstLessonId');
        }
    }

    static async getNextUnitId(prevUnitId: string): Promise<string | null> {
        try {
            const nextUnitId = await CoursesRepository.getNextUnitId(prevUnitId);
            console.log("courses manager getNextUnitId", nextUnitId);
            if (nextUnitId) {
                return nextUnitId;
            } else return null;
        } catch (error: any) {
            console.error('Manager Error [getNextUnitId]:', error.message);
            throw new Error('Error in getting next unit id');
        }
    }

    static async getAllCourses(): Promise<CoursesType[]> {
        try {
            const courses = await CoursesRepository.getAllCourses();
            return courses;
        } catch (error: any) {
            console.error('Manager Error [getAllCourses]:', error.message);
            throw new Error('Error in getAllCourses');
        }
    }

    static async updateCourse(
        courseId: string,
        filedsToUpdate: Partial<CoursesType>
    ): Promise<CoursesType | null> {
        const updatedCourse = await CoursesRepository.updateCourse(
            courseId,
            filedsToUpdate
        );
        try {
            return updatedCourse;
        } catch (error: any) {
            console.error('Manager Error [updateCourse]:', error.message);
            throw new Error('Error in updateCourse');
        }
    }

    static async suspendUnitByCourseId(courseId: string, unitId: string): Promise<CoursesType | null> {
        const updatedCourse = await CoursesRepository.suspendUnitByCourseId(
            courseId,
            unitId
        );
        try {
            return updatedCourse;
        } catch (error: any) {
            console.error('Manager Error [suspendUnitByCourseId]:', error.message);
            throw new Error('Error in suspendUnitByCourseId');
        }
    }

    static async unsuspendUnitByCourseId(courseId: string, unitId: string): Promise<CoursesType | null> {
        const updatedCourse = await CoursesRepository.unsuspendUnitByCourseId(
            courseId,
            unitId
        );
        try {
            return updatedCourse;
        } catch (error: any) {
            console.error('Manager Error [unsuspendUnitByCourseId]:', error.message);
            throw new Error('Error in unsuspendUnitByCourseId');
        }
    }

    static async deleteCourse(courseId: string): Promise<CoursesType | null> {
        try {

            const status = await CoursesRepository.deleteCourse(courseId);
            return status;
        } catch (error: any) {
            console.error('Manager Error [deleteCourse]:', error.message);
            throw new Error('Error in deleteCourse');
        }
    }
}
