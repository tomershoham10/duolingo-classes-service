import UnitsModel from "../units/model.js";
import CoursesModel from "./model.js";
export default class CoursesRepository {
    static async createCourse(course) {
        try {
            const newCourse = await CoursesModel.create(course);
            return newCourse;
        }
        catch (error) {
            if (error.name === 'ValidationError') {
                console.error('Repository Validation Error:', error.message);
                throw new Error('Validation error while creating course');
            }
            else if (error.code === 11000) {
                console.error('Repository Duplicate Key Error:', error.message);
                throw new Error('Duplicate key error while creating course');
            }
            else {
                console.error('Repository Error:', error.message);
                throw new Error('Error creating course');
            }
        }
    }
    static async getCourseById(courseId) {
        try {
            const course = await CoursesModel.findById(courseId);
            console.log("courses repo", courseId);
            return course;
        }
        catch (error) {
            console.error('Repository Error:', error.message);
            throw new Error(`Course repo - getCourseById: ${error}`);
        }
    }
    static async getCourseByName(courseName) {
        try {
            const course = await CoursesModel.findOne({ name: courseName });
            console.log("courses repo", courseName, course);
            return course;
        }
        catch (error) {
            console.error('Repository Error:', error.message);
            throw new Error(`Course repo - getCourseByName: ${error}`);
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
                return [];
        }
        catch (error) {
            console.error('Repository Error:', error.message);
            throw new Error(`Course repo - getUnitsByCourseId: ${error}`);
        }
    }
    static async getUnsuspendedUnitsByCourseId(courseId) {
        try {
            const course = await CoursesModel.findById(courseId);
            console.log("courses repo - getUnsuspendedUnitsByCourseId - course", course);
            if (course) {
                const unitsIds = course.units;
                console.log("courses repo - getUnsuspendedUnitsByCourseId - unitsIds", unitsIds);
                const unsuspendedUnitsIds = unitsIds.filter(unitId => !course.suspendedUnits.includes(unitId));
                console.log("courses repo - getUnsuspendedUnitsByCourseId - unsuspendedUnitsIds", unsuspendedUnitsIds);
                const unitsDetails = await UnitsModel.find({ _id: { $in: unsuspendedUnitsIds } });
                // const unitsInOrder = unitsIds.map(id => unitsDetails.find(unit => unit._id === id));
                console.log("courses repo getUnsuspendedUnitsByCourseId - unitsDetails", unitsDetails);
                return unitsDetails;
            }
            else
                return [];
        }
        catch (error) {
            console.error('Repository Error:', error.message);
            throw new Error(`Course repo - getUnitsByCourseId: ${error}`);
        }
    }
    static async getNextUnitId(prevUnitId) {
        try {
            const course = await CoursesModel.findOne({ units: { $in: [prevUnitId] } });
            console.log("courses repo - getNextUnitId :", course);
            if (course) {
                const unitsIds = course.units;
                const indexOfUnit = unitsIds.indexOf(prevUnitId);
                if (indexOfUnit !== -1 && indexOfUnit + 1 < unitsIds.length) {
                    const nextUnitId = unitsIds[unitsIds.indexOf(prevUnitId) + 1];
                    if (course.suspendedUnits.includes(nextUnitId)) {
                        await this.getNextUnitId(nextUnitId);
                    }
                    return nextUnitId;
                }
                else
                    return "finished";
            }
            else {
                return null;
            }
        }
        catch (error) {
            console.error('Repository Error:', error.message);
            throw new Error(`Course repo - getNextUnitId: ${error}`);
        }
    }
    static async getAllCourses() {
        try {
            const courses = await CoursesModel.find({});
            return courses;
        }
        catch (error) {
            console.error('Repository Error:', error.message);
            throw new Error(`Course repo - getAllCourses: ${error}`);
        }
    }
    static async updateCourse(courseId, fieldsToUpdate) {
        try {
            const updatedCourse = await CoursesModel.findByIdAndUpdate(courseId, fieldsToUpdate, { new: true });
            return updatedCourse;
        }
        catch (error) {
            console.error('Repository Error:', error.message);
            throw new Error(`Course repo - updateCourse: ${error}`);
        }
    }
    static async deleteCourse(courseId) {
        try {
            const status = await CoursesModel.findOneAndDelete({ _id: courseId });
            return status;
        }
        catch (error) {
            console.error('Repository Error:', error.message);
            throw new Error(`Course repo - deleteCourses: ${error}`);
        }
    }
}
//# sourceMappingURL=repository.js.map