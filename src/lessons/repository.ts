import LessonsModel from "./model.js";

export default class LessonsRepository {
    static async createLesson(lesson: Partial<LessonsType>): Promise<LessonsType> {
        const newLesson = await LessonsModel.create(lesson);
        return newLesson;
    }

    static async getLessonById(lessonId: string): Promise<LessonsType | null> {
        const lesson = await LessonsModel.findById(lessonId);
        console.log("lessons repo", lessonId);
        return lesson;
    }

    static async getAllLessons(): Promise<LessonsType[] | null> {
        const lessons = await LessonsModel.find({});
        return lessons;
    }

    static async getLessonsByType(lessonType: TypesOfLessons): Promise<LessonsType[] | null> {
        const lessons = await LessonsModel.find({ type: lessonType });
        return lessons;
    }


    static async updateLesson(
        lessonId: string,
        fieldsToUpdate: Partial<LessonsType>
    ): Promise<LessonsType | null> {
        const updatedLesson = await LessonsModel.findByIdAndUpdate(
            lessonId,
            fieldsToUpdate,
            { new: true }
        );
        return updatedLesson;
    }

    static async deleteLesson(lessonId: string): Promise<LessonsType | null> {
        const status = await LessonsModel.findOneAndDelete({ _id: lessonId });
        return status;
    }
}
