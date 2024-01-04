import TargetModel from "../targets/model.js";
import ResultsModel from "../results/model.js";
import FSAModel from "./model.js";
export default class FSARepository {
    static async createExercise(exercise) {
        try {
            console.log("fsa repo create: ", exercise);
            const newExercise = await FSAModel.create(exercise);
            return newExercise;
        }
        catch (error) {
            console.error('Repository Error:', error.message);
            throw new Error(`FSA repo - createExercise: ${error}`);
        }
    }
    static async getResultByUserAndFSAId(exerciseId, userId) {
        try {
            const exercise = await FSAModel.findById(exerciseId);
            console.log("FSA repo getResultByUserAndFSAId - exercise", exercise);
            if (exercise && userId) {
                const result = await ResultsModel.findOne({ exerciseId: { $eq: exerciseId }, userId: { $eq: userId } });
                console.log("FSA repo getResultByUserAndFSAId - result", result);
                return result;
            }
            else
                return null;
        }
        catch (error) {
            console.error('Repository Error:', error.message);
            throw new Error(`FSA repo - getResultByUserAndFSAId: ${error}`);
        }
    }
    static async getRelevantByFSAId(exerciseId) {
        try {
            const exercise = await FSAModel.findById(exerciseId);
            console.log("FSA repo getRelevantByFSAId - exercise", exercise);
            if (exercise) {
                const relevantIds = exercise.relevant;
                if (relevantIds) {
                    const targetsDetails = await TargetModel.find({ _id: { $in: relevantIds }, type: { $eq: "vessel" } });
                    console.log("FSA repo getRelevantByFSAId - targetsDetails", relevantIds, targetsDetails);
                    return targetsDetails;
                }
                else
                    return null;
            }
            else
                return null;
        }
        catch (error) {
            console.error('Repository Error:', error.message);
            throw new Error(`FSA repo - getRelevantByFSAId: ${error}`);
        }
    }
    static async getAnswersByFSAId(exerciseId) {
        try {
            const exercise = await FSAModel.findById(exerciseId);
            console.log("FSA repo getAnswersByFSAId - exercise", exercise);
            if (exercise) {
                const answersIds = exercise.answersList;
                if (answersIds) {
                    const answersDetails = await TargetModel.find({ _id: { $in: answersIds } });
                    return answersDetails;
                }
                else
                    return null;
            }
            else
                return null;
        }
        catch (error) {
            console.error('Repository Error:', error.message);
            throw new Error(`FSA repo - getAnswersByFSAId: ${error}`);
        }
    }
    static async getExerciseByAnswerId(answerId) {
        try {
            const exercises = await FSAModel.find({ answers: answerId });
            console.log("FSA repo getExerciseByAnswerId", exercises);
            return exercises;
        }
        catch (error) {
            console.error('Repository Error:', error.message);
            throw new Error(`FSA repo - getRelevantByFSAId: ${error}`);
        }
    }
    static async getExerciseById(exerciseId) {
        try {
            const exercise = await FSAModel.findById(exerciseId);
            console.log("FSA repo", exerciseId);
            return exercise;
        }
        catch (error) {
            throw new Error(`fsa repo getExerciseById: ${error}`);
        }
    }
    static async getAllExercises() {
        try {
            const exercises = await FSAModel.find({});
            return exercises;
        }
        catch (error) {
            throw new Error(`fsa repo getAllExercises: ${error}`);
        }
    }
    static async updateExercise(exerciseId, fieldsToUpdate) {
        try {
            const updatedExercise = await FSAModel.findByIdAndUpdate(exerciseId, fieldsToUpdate, { new: true });
            return updatedExercise;
        }
        catch (error) {
            console.error('Repository Error:', error.message);
            throw new Error(`FSA repo - updateExercise: ${error}`);
        }
    }
    static async deleteExercise(exerciseId) {
        try {
            const status = await FSAModel.findOneAndDelete({ _id: exerciseId });
            return status;
        }
        catch (error) {
            console.error('Repository Error:', error.message);
            throw new Error(`FSA repo - deleteExercise: ${error}`);
        }
    }
}
//# sourceMappingURL=repository.js.map