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