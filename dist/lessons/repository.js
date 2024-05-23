import FSAModel from "../FSA/model.js";
import ResultsModel from "../results/model.js";
import LessonsModel from "./model.js";
export default class LessonsRepository {
    static async createLesson(lesson) {
        try {
            const newLesson = await LessonsModel.create(lesson);
            return newLesson;
        }
        catch (error) {
            console.error('Repository Error:', error.message);
            throw new Error(`lesson repo - getsExercisesByLessonId: ${error}`);
        }
    }
    static async getLessonById(lessonId) {
        try {
            const lesson = await LessonsModel.findById(lessonId);
            console.log("lessons repo", lessonId);
            return lesson;
        }
        catch (error) {
            console.error('Repository Error:', error.message);
            throw new Error(`lesson repo - getLessonById: ${error}`);
        }
    }
    static async getsExercisesByLessonId(lessonId) {
        try {
            const lesson = await LessonsModel.findById(lessonId);
            if (lesson) {
                const FSAIds = lesson.exercises;
                if (FSAIds) {
                    const FSADetails = await FSAModel.find({ _id: { $in: FSAIds } });
                    return FSADetails;
                }
                else
                    return [];
            }
            else
                return [];
        }
        catch (error) {
            console.error('Repository Error:', error.message);
            throw new Error(`lesson repo - getsExercisesByLessonId: ${error}`);
        }
    }
    static async getsUnsuspendedExercisesByLessonId(lessonId) {
        try {
            const lesson = await LessonsModel.findById(lessonId);
            if (lesson) {
                const FSAIds = lesson.exercises;
                console.log('repo - getsUnsuspendedExercisesByLessonId: FSAIds', FSAIds);
                const unSuspendFSAsIds = FSAIds.filter(lessonId => !lesson.suspendedExercises.includes(lessonId));
                console.log('repo - getsUnsuspendedExercisesByLessonId: unSuspendFSAsIds', lesson.suspendedExercises, unSuspendFSAsIds);
                if (unSuspendFSAsIds.length > 0) {
                    const FSADetails = await FSAModel.find({ _id: { $in: unSuspendFSAsIds } });
                    console.log('repo - getsUnsuspendedExercisesByLessonId: FSADetails', FSADetails);
                    return FSADetails;
                }
                else
                    return [];
            }
            else
                return [];
        }
        catch (error) {
            console.error('Repository Error:', error.message);
            throw new Error(`lesson repo - getsExercisesByLessonId: ${error}`);
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
                    // const FSAsIdInOrder = FSADetails.map((FSA) => { if (FSA !== undefined) { FSA.id } });
                    const resResults = await ResultsModel.find({ exerciseId: { $in: FSAIds }, userId: userId });
                    const FSAsInOrder = resResults.sort((a, b) => {
                        const aIndex = FSAIds.indexOf(a._id);
                        const bIndex = FSAIds.indexOf(b._id);
                        return aIndex - bIndex;
                    });
                    console.log(" lessons repo - results", { numOfExercises: FSAIds.length, results: FSAsInOrder });
                    const results = { numOfExercises: FSAIds.length, results: FSAsInOrder };
                    return results;
                }
                else
                    return null;
            }
            else
                return null;
        }
        catch (error) {
            console.error('Repository Error:', error.message);
            throw new Error(`lesson repo - getResultsByLessonIdAndUserId: ${error}`);
        }
    }
    static async getAllLessons() {
        try {
            const lessons = await LessonsModel.find({});
            return lessons;
        }
        catch (error) {
            console.error('Repository Error:', error.message);
            throw new Error(`lesson repo - getAllLessons: ${error}`);
        }
    }
    static async updateLesson(lessonId, fieldsToUpdate) {
        try {
            const updatedLesson = await LessonsModel.findByIdAndUpdate(lessonId, fieldsToUpdate, { new: true });
            return updatedLesson;
        }
        catch (error) {
            console.error('Repository Error:', error.message);
            throw new Error(`lesson repo - updateLesson: ${error}`);
        }
    }
    static async deleteLesson(lessonId) {
        try {
            const status = await LessonsModel.findOneAndDelete({ _id: lessonId });
            return status;
        }
        catch (error) {
            console.error('Repository Error:', error.message);
            throw new Error(`lesson repo - deleteLesson: ${error}`);
        }
    }
}
//# sourceMappingURL=repository.js.map