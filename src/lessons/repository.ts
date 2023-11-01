import FSAModel from "../FSA/model.js";
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


    static async getsExercisesByUnitId(lessonId: string): Promise<FSAType[] | undefined | null> {
        try {
            const lesson = await LessonsModel.findById(lessonId);
            if (lesson) {
                const FSAIds = lesson.exercises;

                const FSADetails = await FSAModel.find({ _id: { $in: FSAIds } });

                if (FSAIds) {
                    const FSAsInOrder = FSAIds.map((id: any) => FSADetails.find(fsa => fsa._id.equals(id)));

                    console.log("lessons repo getsExercisesByUnitId", lessonId);
                    return FSAsInOrder as FSAType[];
                }
            }
            else return null
        } catch (err) {
            throw new Error(`Error repo getsLessonsByUnitId: ${err}`);
        }
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
