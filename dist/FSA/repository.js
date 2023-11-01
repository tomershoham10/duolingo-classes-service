import FSAModel from "./model.js";
export default class FSARepository {
    static async createExercise(exercise) {
        try {
            console.log("fsa repo create: ", exercise);
            const newExercise = await FSAModel.create(exercise);
            return newExercise;
        }
        catch (error) {
            throw new Error(`fsa repo create: ${error}`);
        }
    }
    static async getExerciseByAnswerId(answerId) {
        try {
            const exercises = await FSAModel.find({ answers: answerId });
            console.log("FSA repo getExerciseByAnswerId", exercises);
            return exercises;
        }
        catch (error) {
            throw new Error(`fsa repo getExerciseByAnswerId: ${error}`);
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
            throw new Error(`fsa repo updateExercise: ${error}`);
        }
    }
    static async deleteExercise(exerciseId) {
        try {
            const status = await FSAModel.findOneAndDelete({ _id: exerciseId });
            return status;
        }
        catch (error) {
            throw new Error(`fsa repo deleteExercise: ${error}`);
        }
    }
}
//# sourceMappingURL=repository.js.map