import FSAModel from "../FSA/model.js";
import ResultsModel from "../results/model.js";
import LessonsModel from "./model.js";

export default class LessonsRepository {
    static async createLesson(lesson: Partial<LessonsType>): Promise<LessonsType> {
        try {
            const newLesson = await LessonsModel.create(lesson);
            return newLesson;
        }
        catch (error: any) {
            console.error('Repository Error:', error.message);
            throw new Error(`lesson repo - getsExercisesByLessonId: ${error}`);
        }
    }

    static async getLessonById(lessonId: string): Promise<LessonsType | null> {
        try {
            const lesson = await LessonsModel.findById(lessonId);
            console.log("lessons repo", lessonId);
            return lesson;
        }

        catch (error: any) {
            console.error('Repository Error:', error.message);
            throw new Error(`lesson repo - getLessonById: ${error}`);
        }
    }

    static async getsExercisesByLessonId(lessonId: string): Promise<FSAType[] | null> {
        try {
            const lesson = await LessonsModel.findById(lessonId);
            if (lesson) {
                const FSAIds = lesson.exercises;

                // const FSADetails2 = await FSAModel.find({ _id: { $in: FSAIds.map(id => (id)) } });

                if (FSAIds) {
                    const FSADetails = await FSAModel.find({ _id: { $in: FSAIds } });

                    // const FSAsInOrder = FSAIds.map((id: any) => FSADetails.find(fsa => fsa._id === id));

                    // console.log("lessons repo getsExercisesByLessonId", FSAIds, FSADetails, FSAsInOrder);
                    return FSADetails as FSAType[];
                }
                else return null;
            }
            else return null;
        } catch (error: any) {
            console.error('Repository Error:', error.message);
            throw new Error(`lesson repo - getsExercisesByLessonId: ${error}`);
        }
    }

    static async getResultsByLessonIdAndUserId(lessonId: string, userId: string): Promise<{ numOfExercises: number, results: ResultType[] } | null> {
        try {
            console.log("lessons repo getsExercisesByUnitId", "lessonId", lessonId, "userId", userId);

            const lesson = await LessonsModel.findById(lessonId);
            if (lesson) {
                const FSAIds = lesson.exercises;


                if (FSAIds) {
                    // const FSADetails: FSAType[] = await FSAModel.find({ _id: { $in: FSAIds } });
                    console.log(" lessons repo - FSAIds", FSAIds)
                    // const FSAsInOrder = FSAIds.map((id: string) => FSADetails.find(fsa => fsa.id === id));

                    // const FSAsIdInOrder = FSADetails.map((FSA) => { if (FSA !== undefined) { FSA.id } });

                    const resResults: ResultType[] = await ResultsModel.find({ exerciseId: { $in: FSAIds }, userId: userId });
                    console.log(" lessons repo - results", { numOfExercises: FSAIds.length, results: resResults })
                    const results = { numOfExercises: FSAIds.length, results: resResults }
                    return results as { numOfExercises: number, results: ResultType[] };
                }
                else return null;
            }
            else return null;
        } catch (error: any) {
            console.error('Repository Error:', error.message);
            throw new Error(`lesson repo - getResultsByLessonIdAndUserId: ${error}`);
        }
    }

    static async getAllLessons(): Promise<LessonsType[]> {
        try {
            const lessons = await LessonsModel.find({});
            return lessons;
        }
        catch (error: any) {
            console.error('Repository Error:', error.message);
            throw new Error(`lesson repo - getAllLessons: ${error}`);
        }
    }

    static async updateLesson(
        lessonId: string,
        fieldsToUpdate: Partial<LessonsType>
    ): Promise<LessonsType | null> {
        try {
            const updatedLesson = await LessonsModel.findByIdAndUpdate(
                lessonId,
                fieldsToUpdate,
                { new: true }
            );
            return updatedLesson;
        } catch (error: any) {
            console.error('Repository Error:', error.message);
            throw new Error(`lesson repo - updateLesson: ${error}`);
        }
    }

    static async deleteLesson(lessonId: string): Promise<LessonsType | null> {
        try {
            const status = await LessonsModel.findOneAndDelete({ _id: lessonId });
            return status;
        }
        catch (error: any) {
            console.error('Repository Error:', error.message);
            throw new Error(`lesson repo - deleteLesson: ${error}`);
        }
    }
}
