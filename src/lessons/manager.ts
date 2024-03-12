import LessonsRepository from "./repository.js";

export default class LessonsManager {
    static async createLesson(
        lesson: Partial<LessonsType>): Promise<LessonsType> {
        try {
            const response = await LessonsRepository.createLesson(lesson);
            return response;
        }
        catch (error: any) {
            console.error('Manager Error [createLesson]:', error.message);
            throw new Error('Error in createLesson');
        }
    }

    static async getLessonById(lessonId: string): Promise<LessonsType | null> {
        try {
            const lesson = await LessonsRepository.getLessonById(lessonId);
            console.log("Lessons manager", lesson);
            return lesson;
        }
        catch (error: any) {
            console.error('Manager Error [getLessonById]:', error.message);
            throw new Error('Error in getLessonById');
        }
    }

    static async getsExercisesByLessonId(lessonId: string): Promise<FSAType[]> {
        try {
            const exercises = await LessonsRepository.getsExercisesByLessonId(lessonId);
            console.log("lesson manager getsExercisesByLessonId", exercises);
            return exercises;
        }
        catch (error: any) {
            console.error('Manager Error [getsExercisesByLessonId]:', error.message);
            throw new Error('Error in getsExercisesByLessonId');
        }
    }

    static async getsUnsuspendedExercisesByLessonId(lessonId: string): Promise<FSAType[]> {
        try {
            const exercises = await LessonsRepository.getsUnsuspendedExercisesByLessonId(lessonId);
            console.log("lesson manager getsUnsuspendedExercisesByLessonId", exercises);
            return exercises;
        }
        catch (error: any) {
            console.error('Manager Error [getsUnsuspendedExercisesByLessonId]:', error.message);
            throw new Error('Error in getsUnsuspendedExercisesByLessonId');
        }
    }

    static async getResultsByLessonIdAndUserId(lessonId: string, userId: string): Promise<{ numOfExercises: number, results: ResultType[] } | null | undefined> {
        try {
            const results = await LessonsRepository.getResultsByLessonIdAndUserId(lessonId, userId);
            console.log("lesson manager getsResultsByLessonId", results);
            return results;
        }
        catch (error: any) {
            console.error('Manager Error [getResultsByLessonIdAndUserId]:', error.message);
            throw new Error('Error in getResultsByLessonIdAndUserId');
        }
    }

    static async getAllLessons(): Promise<LessonsType[]> {
        try {
            const lessons = await LessonsRepository.getAllLessons();
            return lessons;
        } catch (error: any) {
            console.error('Manager Error [getAllLessons]:', error.message);
            throw new Error('Error in getAllLessons');
        }
    }

    static async updateLesson(
        lessonId: string,
        filedsToUpdate: Partial<LessonsType>
    ): Promise<LessonsType | null> {
        try {
            const updatedLesson = await LessonsRepository.updateLesson(
                lessonId,
                filedsToUpdate
            );
            return updatedLesson;
        } catch (error: any) {
            console.error('Manager Error [updateLesson]:', error.message);
            throw new Error('Error in updateLesson');
        }
    }

    static async deleteLesson(lessonId: string): Promise<LessonsType | null> {
        try {
            const status = await LessonsRepository.deleteLesson(lessonId);
            return status;
        } catch (error: any) {
            console.error('Manager Error [deleteLesson]:', error.message);
            throw new Error('Error in deleteLesson');
        }
    }
}
