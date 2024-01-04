import FSARepository from "./repository.js";
export default class FSAManager {
    static async createExercise(exercise) {
        try {
            const response = await FSARepository.createExercise(exercise);
            return response;
        }
        catch (error) {
            console.error('Manager Error [createExercise]:', error.message);
            throw new Error('Error in createExercise');
        }
    }
    static async getResultByUserAndFSAId(exerciseId, useId) {
        try {
            console.log("FSA manager getResultByUserAndFSAId - exerciseId", exerciseId);
            const result = await FSARepository.getResultByUserAndFSAId(exerciseId, useId);
            console.log("FSA manager getResultByUserAndFSAId - result", result);
            return result;
        }
        catch (error) {
            console.error('Manager Error [getResultByUserAndFSAId]:', error.message);
            throw new Error('Error in getResultByUserAndFSAId');
        }
    }
    static async getRelevantByFSAId(exerciseId) {
        try {
            console.log("FSA manager getRelevantByFSAId - exerciseId", exerciseId);
            const relevant = await FSARepository.getRelevantByFSAId(exerciseId);
            console.log("FSA manager getRelevantByFSAId - relevant targets", relevant);
            return relevant;
        }
        catch (error) {
            console.error('Manager Error [getRelevantByFSAId]:', error.message);
            throw new Error('Error in getRelevantByFSAId');
        }
    }
    static async getAnswersByFSAId(exerciseId) {
        try {
            console.log("FSA manager getAnswersByFSAId - exerciseId", exerciseId);
            const targets = await FSARepository.getAnswersByFSAId(exerciseId);
            console.log("FSA manager getAnswersByFSAId - targets", targets);
            return targets;
        }
        catch (error) {
            console.error('Manager Error [getAnswersByFSAId]:', error.message);
            throw new Error('Error in getAnswersByFSAId');
        }
    }
    static async getExerciseByAnswerId(answerId) {
        try {
            const exercises = await FSARepository.getExerciseByAnswerId(answerId);
            console.log("FSA manager getExerciseByAnswerId", exercises);
            return exercises;
        }
        catch (error) {
            console.error('Manager Error [getExerciseByAnswerId]:', error.message);
            throw new Error('Error in getExerciseByAnswerId');
        }
    }
    static async getExerciseById(exerciseId) {
        try {
            const exercise = await FSARepository.getExerciseById(exerciseId);
            console.log("FSA manager", exercise);
            return exercise;
        }
        catch (error) {
            console.error('Manager Error [getExerciseByAnswerId]:', error.message);
            throw new Error('Error in getExerciseByAnswerId');
        }
    }
    static async getAllExercise() {
        try {
            const exercises = await FSARepository.getAllExercises();
            return exercises;
        }
        catch (error) {
            console.error('Manager Error [getAllExercise]:', error.message);
            throw new Error('Error in getAllExercise');
        }
    }
    static async updateExercise(exerciseId, filedsToUpdate) {
        try {
            const updatedExercise = await FSARepository.updateExercise(exerciseId, filedsToUpdate);
            return updatedExercise;
        }
        catch (error) {
            console.error('Manager Error [updateExercise]:', error.message);
            throw new Error('Error in updateExercise');
        }
    }
    static async deleteExercise(exerciseId) {
        try {
            const status = await FSARepository.deleteExercise(exerciseId);
            return status;
        }
        catch (error) {
            console.error('Manager Error [deleteExercise]:', error.message);
            throw new Error('Error in deleteExercise');
        }
    }
}
//# sourceMappingURL=manager.js.map