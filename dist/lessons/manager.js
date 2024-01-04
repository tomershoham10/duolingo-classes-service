import LessonsRepository from "./repository.js";
export default class LessonsManager {
    static async createLesson(lesson) {
        try {
            const response = await LessonsRepository.createLesson(lesson);
            return response;
        }
        catch (error) {
            console.error('Manager Error [createLesson]:', error.message);
            throw new Error('Error in createLesson');
        }
    }
    static async getLessonById(lessonId) {
        try {
            const lesson = await LessonsRepository.getLessonById(lessonId);
            console.log("Lessons manager", lesson);
            return lesson;
        }
        catch (error) {
            console.error('Manager Error [getLessonById]:', error.message);
            throw new Error('Error in getLessonById');
        }
    }
    static async getsExercisesByLessonId(lessonId) {
        try {
            const exercises = await LessonsRepository.getsExercisesByLessonId(lessonId);
            console.log("lesson manager getsExercisesByLessonId", exercises);
            return exercises;
        }
        catch (error) {
            console.error('Manager Error [getsExercisesByLessonId]:', error.message);
            throw new Error('Error in getsExercisesByLessonId');
        }
    }
    static async getResultsByLessonIdAndUserId(lessonId, userId) {
        try {
            const results = await LessonsRepository.getResultsByLessonIdAndUserId(lessonId, userId);
            console.log("lesson manager getsResultsByLessonId", results);
            return results;
        }
        catch (error) {
            console.error('Manager Error [getResultsByLessonIdAndUserId]:', error.message);
            throw new Error('Error in getResultsByLessonIdAndUserId');
        }
    }
    static async getAllLessons() {
        try {
            const lessons = await LessonsRepository.getAllLessons();
            return lessons;
        }
        catch (error) {
            console.error('Manager Error [getAllLessons]:', error.message);
            throw new Error('Error in getAllLessons');
        }
    }
    static async updateLesson(lessonId, filedsToUpdate) {
        try {
            const updatedLesson = await LessonsRepository.updateLesson(lessonId, filedsToUpdate);
            return updatedLesson;
        }
        catch (error) {
            console.error('Manager Error [updateLesson]:', error.message);
            throw new Error('Error in updateLesson');
        }
    }
    static async deleteLesson(lessonId) {
        try {
            const status = await LessonsRepository.deleteLesson(lessonId);
            return status;
        }
        catch (error) {
            console.error('Manager Error [deleteLesson]:', error.message);
            throw new Error('Error in deleteLesson');
        }
    }
}
//# sourceMappingURL=manager.js.map