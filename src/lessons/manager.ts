import LessonsRepository from "./repository.js";

export default class LessonsManager {
    static async createLesson(
        lesson: Partial<LessonsType>): Promise<LessonsType> {
        const response = await LessonsRepository.createLesson(lesson);
        return response
    }

    static async getLessonById(lessonId: string): Promise<LessonsType | null> {
        const lesson = await LessonsRepository.getLessonById(lessonId);
        console.log("Lessons manager", lesson);
        return lesson;
    }

    static async getAllLessons(): Promise<LessonsType[] | null> {
        const lessons = await LessonsRepository.getAllLessons();
        return lessons;
    }

    static async getLessonsByType(lessonType: TypesOfLessons): Promise<LessonsType[] | null> {
        const lessons = await LessonsRepository.getLessonsByType(lessonType);
        return lessons;
    }

    static async updateLesson(
        lessonId: string,
        filedsToUpdate: Partial<LessonsType>
    ): Promise<LessonsType | null> {
        const updatedLesson = await LessonsRepository.updateLesson(
            lessonId,
            filedsToUpdate
        );
        return updatedLesson;
    }

    static async deleteLesson(lessonId: string): Promise<LessonsType | null> {
        const status = await LessonsRepository.deleteLesson(lessonId);
        return status;
    }
}
