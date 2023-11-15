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
                // const FSADetails2 = await FSAModel.find({ _id: { $in: FSAIds.map(id => (id)) } });
                if (FSAIds) {
                    const FSADetails = await FSAModel.find({ _id: { $in: FSAIds } });
                    // const FSAsInOrder = FSAIds.map((id: any) => FSADetails.find(fsa => fsa._id === id));
                    // console.log("lessons repo getsExercisesByLessonId", FSAIds, FSADetails, FSAsInOrder);
                    return FSADetails;
                }
                //bee was here
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
            console.log("lessons repo getsExercisesByUnitId", "lessonId", lessonId, "userId", userId);
            const lesson = await LessonsModel.findById(lessonId);
            if (lesson) {
                const FSAIds = lesson.exercises;
                if (FSAIds) {
                    // const FSADetails: FSAType[] = await FSAModel.find({ _id: { $in: FSAIds } });
                    console.log(" lessons repo - FSAIds", FSAIds);
                    // const FSAsInOrder = FSAIds.map((id: string) => FSADetails.find(fsa => fsa.id === id));
                    // const FSAsIdInOrder = FSADetails.map((FSA) => { if (FSA !== undefined) { FSA.id } });
                    const resResults = await ResultsModel.find({ exerciseId: { $in: FSAIds }, userId: userId });
                    console.log(" lessons repo - results", { numOfExercises: FSAIds.length, results: resResults });
                    const results = { numOfExercises: FSAIds.length, results: resResults };
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