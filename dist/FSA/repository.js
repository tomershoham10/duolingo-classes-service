import FSAModel from "./model.js";
export default class FSARepository {
    static async createExercise(exercise) {
        const newExercise = await FSAModel.create(exercise);
        return newExercise;
    }
    static async getExerciseById(exerciseId) {
        const exercise = await FSAModel.findById(exerciseId);
        console.log("FSA repo", exerciseId);
        return exercise;
    }
    static async getAllExercises() {
        const exercises = await FSAModel.find({});
        return exercises;
    }
    static async updateExercise(exerciseId, fieldsToUpdate) {
        const updatedExercise = await FSAModel.findByIdAndUpdate(exerciseId, fieldsToUpdate, { new: true });
        return updatedExercise;
    }
    static async deleteExercise(exerciseId) {
        const status = await FSAModel.findOneAndDelete({ _id: exerciseId });
        return status;
    }
}
//# sourceMappingURL=repository.js.map