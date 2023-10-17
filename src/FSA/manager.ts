import FSARepository from "./repository.js";

export default class FSAManager {
    static async createExercise(
        exercise: Partial<FSAType>): Promise<FSAType> {
        const response = await FSARepository.createExercise(exercise);
        return response
    }

    static async getExerciseById(exerciseId: string): Promise<FSAType | null> {
        const exercise = await FSARepository.getExerciseById(exerciseId);
        console.log("FSA manager", exercise);
        return exercise;
    }

    static async getAllExercise(): Promise<FSAType[]> {
        const exercises = await FSARepository.getAllExercises();
        return exercises;
    }

    static async updateExercise(
        exerciseId: string,
        filedsToUpdate: Partial<FSAType>
    ): Promise<FSAType | null> {
        const updatedExercise = await FSARepository.updateExercise(
            exerciseId,
            filedsToUpdate
        );
        return updatedExercise;
    }

    static async deleteExercise(exerciseId: string): Promise<FSAType | null> {
        const status = await FSARepository.deleteExercise(exerciseId);
        return status;
    }
}
