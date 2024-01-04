import mongoose from "mongoose";
import CoursesRepository from "./repository.js";
import UnitsManager from "../units/manager.js";
export default class CoursesManager {
    static async createCourse(course) {
        const session = await mongoose.startSession();
        session.startTransaction();
        try {
            const createdUnit = await UnitsManager.createUnit({});
            console.log("createCourse manager - createdUnit", createdUnit);
            const createdCourse = await CoursesRepository.createCourse({ ...course, units: [createdUnit._id] });
            await session.commitTransaction();
            return createdCourse;
        }
        catch (error) {
            await session.abortTransaction();
            console.error('Manager Error [createCourse]:', error.message);
            throw new Error('Error in course creation process');
        }
        finally {
            session.endSession();
        }
    }
    static async getCourseById(courseId) {
        try {
            const course = await CoursesRepository.getCourseById(courseId);
            console.log("courses manager", course);
            return course;
        }
        catch (error) {
            console.error('Manager Error [getCourseById]:', error.message);
            throw new Error('Error in getCourseById');
        }
    }
    static async getCourseByName(courseName) {
        try {
            const course = await CoursesRepository.getCourseByName(courseName);
            console.log("courses manager", course);
            return course;
        }
        catch (error) {
            console.error('Manager Error [getCourseById]:', error.message);
            throw new Error('Error in getting course by id');
        }
    }
    static async getUnitsByCourseId(courseId) {
        try {
            const units = await CoursesRepository.getUnitsByCourseId(courseId);
            console.log("courses manager getUnitsByCourseId", units);
            return units;
        }
        catch (error) {
            console.error('Manager Error [getUnitsByCourseId]:', error.message);
            throw new Error('Error in getting units by course id');
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
        catch (error) {
            console.error('Manager Error [getNextUnitId]:', error.message);
            throw new Error('Error in getting next unit id');
        }
    }
    static async getAllCourses() {
        try {
            const courses = await CoursesRepository.getAllCourses();
            return courses;
        }
        catch (error) {
            console.error('Manager Error [getAllCourses]:', error.message);
            throw new Error('Error in getAllCourses');
        }
    }
    static async updateCourse(courseId, filedsToUpdate) {
        const updatedCourse = await CoursesRepository.updateCourse(courseId, filedsToUpdate);
        try {
            return updatedCourse;
        }
        catch (error) {
            console.error('Manager Error [updateCourse]:', error.message);
            throw new Error('Error in updateCourse');
        }
    }
    static async deleteCourse(courseId) {
        try {
            const status = await CoursesRepository.deleteCourse(courseId);
            return status;
        }
        catch (error) {
            console.error('Manager Error [deleteCourse]:', error.message);
            throw new Error('Error in deleteCourse');
        }
    }
}
//# sourceMappingURL=manager.js.map