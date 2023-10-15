import FSARepository from "./repository.js";
export default class FSAManager {
    static async createExercise(exercise) {
        const response = await FSARepository.createExercise(exercise);
        return response;
    }
    static async getExerciseById(exerciseId) {
        const exercise = await FSARepository.getExerciseById(exerciseId);
        console.log("FSA manager", exercise);
        return exercise;
    }
    static async getAllExercise() {
        const exercises = await FSARepository.getAllExercises();
        return exercises;
    }
    static async updateExercise(exerciseId, filedsToUpdate) {
        const updatedExercise = await FSARepository.updateExercise(exerciseId, filedsToUpdate);
        return updatedExercise;
    }
    static async deleteExercise(exerciseId) {
        const status = await FSARepository.deleteExercise(exerciseId);
        return status;
    }
}
//# sourceMappingURL=manager.js.map