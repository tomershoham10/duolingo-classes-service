import FSARepository from "./repository.js";
export default class FSAManager {
    static async createExercise(exercise) {
        try {
            const response = await FSARepository.createExercise(exercise);
            return response;
        }
        catch (error) {
            throw new Error(`FSA repo createExercise: ${error}`);
        }
    }
    static async getOptionsByFSAId(exerciseId) {
        try {
            console.log("FSA manager getOptionsByFSAId - exerciseId", exerciseId);
            const options = await FSARepository.getOptionsByFSAId(exerciseId);
            console.log("FSA manager getOptionsByFSAId - options", options);
            return options;
        }
        catch (error) {
            throw new Error(`FSA repo getOptionsByFSAId: ${error}`);
        }
    }
    static async getAnswersByFSAId(exerciseId) {
        try {
            console.log("FSA manager getAnswersByFSAId - exerciseId", exerciseId);
            const options = await FSARepository.getAnswersByFSAId(exerciseId);
            console.log("FSA manager getAnswersByFSAId - options", options);
            return options;
        }
        catch (error) {
            throw new Error(`FSA repo getAnswersByFSAId: ${error}`);
        }
    }
    static async getExerciseByAnswerId(answerId) {
        try {
            const exercises = await FSARepository.getExerciseByAnswerId(answerId);
            console.log("FSA manager getExerciseByAnswerId", exercises);
            return exercises;
        }
        catch (error) {
            throw new Error(`FSA repo getExerciseByAnswerId: ${error}`);
        }
    }
    static async getExerciseById(exerciseId) {
        try {
            const exercise = await FSARepository.getExerciseById(exerciseId);
            console.log("FSA manager", exercise);
            return exercise;
        }
        catch (error) {
            throw new Error(`FSA repo getExerciseById: ${error}`);
        }
    }
    static async getAllExercise() {
        try {
            const exercises = await FSARepository.getAllExercises();
            return exercises;
        }
        catch (error) {
            throw new Error(`FSA repo getAllExercise: ${error}`);
        }
    }
    static async updateExercise(exerciseId, filedsToUpdate) {
        try {
            const updatedExercise = await FSARepository.updateExercise(exerciseId, filedsToUpdate);
            return updatedExercise;
        }
        catch (error) {
            throw new Error(`FSA repo updateExercise: ${error}`);
        }
    }
    static async deleteExercise(exerciseId) {
        try {
            const status = await FSARepository.deleteExercise(exerciseId);
            return status;
        }
        catch (error) {
            throw new Error(`FSA repo deleteExercise: ${error}`);
        }
    }
}
//# sourceMappingURL=manager.js.map