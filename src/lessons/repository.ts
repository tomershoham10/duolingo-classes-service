import mongoose from "mongoose";
import FSAModel from "../FSA/model.js";
import ResultsModel from "../results/model.js";
import LessonsModel from "./model.js";

import { ObjectId } from 'mongodb'

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

    static async getsExercisesByLessonId(lessonId: string): Promise<FSAType[] | undefined | null> {
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
                //bee was here
            }
            else return null
        } catch (err) {
            throw new Error(`Error repo getsLessonsByUnitId: ${err}`);
        }
    }

    static async getResultsByLessonIdAndUserId(lessonId: string, userId: string): Promise<ResultType[] | undefined | null> {
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

                    const results: ResultType[] = await ResultsModel.find({ exerciseId: { $in: FSAIds }, userId: userId });
                    console.log(" lessons repo - results", results)

                    return results as ResultType[];
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
