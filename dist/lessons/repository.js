import mongoose from "mongoose";
import FSAModel from "../FSA/model.js";
import ResultsModel from "../results/model.js";
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
    static async getsExercisesByLessonId(lessonId) {
        try {
            const lesson = await LessonsModel.findById(lessonId);
            if (lesson) {
                const FSAIds = lesson.exercises;
                const FSADetails = await FSAModel.find({ _id: { $in: FSAIds } });
                const FSADetails2 = await FSAModel.find({ _id: { $in: FSAIds.map(id => new mongoose.Types.ObjectId(id)) } });
                if (FSAIds) {
                    const FSAsInOrder = FSAIds.map((id) => FSADetails.find(fsa => fsa._id === id));
                    console.log("lessons repo getsExercisesByLessonId", FSAIds, FSADetails, FSADetails2, new mongoose.Types.ObjectId(FSAIds[0]), FSAsInOrder);
                    return FSAsInOrder;
                }
            }
            else
                return null;
        }
        catch (err) {
            throw new Error(`Error repo getsLessonsByUnitId: ${err}`);
        }
    }
    static async getResultsByLessonIdAndUserId(lessonId, userId) {
        try {
            const lesson = await LessonsModel.findById(lessonId);
            if (lesson) {
                const FSAIds = lesson.exercises;
                const FSADetails = await FSAModel.find({ _id: { $in: FSAIds } });
                if (FSAIds) {
                    const FSAsInOrder = FSAIds.map((id) => FSADetails.find(fsa => fsa.id === id));
                    const FSAsIdInOrder = FSAsInOrder.map((FSA) => { if (FSA !== undefined) {
                        FSA.id;
                    } });
                    const results = await ResultsModel.find({ _id: { $in: FSAsIdInOrder }, userId: userId });
                    console.log("lessons repo getsExercisesByUnitId", lessonId);
                    return results;
                }
            }
            else
                return null;
        }
        catch (err) {
            throw new Error(`Error repo getsLessonsByUnitId: ${err}`);
        }
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