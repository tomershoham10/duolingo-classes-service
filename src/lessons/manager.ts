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

    static async getsExercisesByLessonId(lessonId: string): Promise<FSAType[] | null | undefined> {
        try {
            const exercises = await LessonsRepository.getsExercisesByLessonId(lessonId);
            console.log("lesson manager getsExercisesByLessonId", exercises);
            return exercises;
        }
        catch (err) {
            throw new Error(`Error manager getsExercisesByUnitId: ${err}`);
        }
    }

    static async getResultsByLessonIdAndUserId(lessonId: string, userId: string): Promise<{ numOfExercises: number, results: ResultType[] } | null | undefined> {
        try {
            const results = await LessonsRepository.getResultsByLessonIdAndUserId(lessonId, userId);
            console.log("lesson manager getsResultsByLessonId", results);
            return results;
        }
        catch (err) {
            throw new Error(`Error manager getsResultsByLessonId: ${err}`);
        }
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
