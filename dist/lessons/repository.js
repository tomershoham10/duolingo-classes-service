import LessonsModel from "./model.js";
export default class LessonsRepository {
    static async createLesson(lesson) {
        const newLesson = await LessonsModel.create(lesson);
        return newLesson;
    }
    static async getLessonById(lessonId) {
        const lesson = await LessonsModel.findById(lessonId);
        console.log("lessons repo", lessonId);
        return lesson;
    }
    static async getAllLessons() {
        const lessons = await LessonsModel.find({});
        return lessons;
    }
    static async getLessonsByType(lessonType) {
        const lessons = await LessonsModel.find({ type: lessonType });
        return lessons;
    }
    static async updateLesson(lessonId, fieldsToUpdate) {
        const updatedLesson = await LessonsModel.findByIdAndUpdate(lessonId, fieldsToUpdate, { new: true });
        return updatedLesson;
    }
    static async deleteLesson(lessonId) {
        const status = await LessonsModel.findOneAndDelete({ _id: lessonId });
        return status;
    }
}
//# sourceMappingURL=repository.js.map