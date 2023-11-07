import LessonsRepository from "./repository.js";
export default class LessonsManager {
    static async createLesson(lesson) {
        const response = await LessonsRepository.createLesson(lesson);
        return response;
    }
    static async getLessonById(lessonId) {
        const lesson = await LessonsRepository.getLessonById(lessonId);
        console.log("Lessons manager", lesson);
        return lesson;
    }
    static async getsExercisesByLessonId(lessonId) {
        try {
            const exercises = await LessonsRepository.getsExercisesByLessonId(lessonId);
            console.log("lesson manager getsExercisesByLessonId", exercises);
            return exercises;
        }
        catch (err) {
            throw new Error(`Error manager getsExercisesByUnitId: ${err}`);
        }
    }
    static async getResultsByLessonIdAndUserId(lessonId, userId) {
        try {
            const results = await LessonsRepository.getResultsByLessonIdAndUserId(lessonId, userId);
            console.log("lesson manager getsResultsByLessonId", results);
            return results;
        }
        catch (err) {
            throw new Error(`Error manager getsResultsByLessonId: ${err}`);
        }
    }
    static async getAllLessons() {
        const lessons = await LessonsRepository.getAllLessons();
        return lessons;
    }
    static async getLessonsByType(lessonType) {
        const lessons = await LessonsRepository.getLessonsByType(lessonType);
        return lessons;
    }
    static async updateLesson(lessonId, filedsToUpdate) {
        const updatedLesson = await LessonsRepository.updateLesson(lessonId, filedsToUpdate);
        return updatedLesson;
    }
    static async deleteLesson(lessonId) {
        const status = await LessonsRepository.deleteLesson(lessonId);
        return status;
    }
}
//# sourceMappingURL=manager.js.map