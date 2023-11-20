import FSARepository from "./repository.js";

export default class FSAManager {
    static async createExercise(
        exercise: Partial<FSAType>): Promise<FSAType> {
        try {

            const response = await FSARepository.createExercise(exercise);
            return response
        } catch (error) {
            throw new Error(`FSA manager createExercise: ${error}`);
        }
    }

    static async getResultByUserAndFSAId(exerciseId: string, useId: string): Promise<ResultType | undefined | null> {
        try {
            console.log("FSA manager getResultByUserAndFSAId - exerciseId", exerciseId);
            const result = await FSARepository.getResultByUserAndFSAId(exerciseId, useId);
            console.log("FSA manager getResultByUserAndFSAId - result", result);
            return result;
        } catch (error) {
            throw new Error(`FSA manager getResultByUserAndFSAId: ${error}`);
        }
    }

    static async getRelevantByFSAId(exerciseId: string): Promise<OptionType[] | undefined | null> {
        try {
            console.log("FSA manager getRelevantByFSAId - exerciseId", exerciseId);
            const relevant = await FSARepository.getRelevantByFSAId(exerciseId);
            console.log("FSA manager getRelevantByFSAId - relevant options", relevant);
            return relevant;
        } catch (error) {
            throw new Error(`FSA manager getRelevantByFSAId: ${error}`);
        }
    }

    static async getAnswersByFSAId(exerciseId: string): Promise<OptionType[] | undefined | null> {
        try {
            console.log("FSA manager getAnswersByFSAId - exerciseId", exerciseId);
            const options = await FSARepository.getAnswersByFSAId(exerciseId);
            console.log("FSA manager getAnswersByFSAId - options", options);
            return options;
        } catch (error) {
            throw new Error(`FSA manager getAnswersByFSAId: ${error}`);
        }
    }

    static async getExerciseByAnswerId(answerId: string): Promise<FSAType[] | null> {
        try {

            const exercises = await FSARepository.getExerciseByAnswerId(answerId);
            console.log("FSA manager getExerciseByAnswerId", exercises);
            return exercises;
        } catch (error) {
            throw new Error(`FSA manager getExerciseByAnswerId: ${error}`);
        }
    }

    static async getExerciseById(exerciseId: string): Promise<FSAType | null> {
        try {

            const exercise = await FSARepository.getExerciseById(exerciseId);
            console.log("FSA manager", exercise);
            return exercise;
        } catch (error) {
            throw new Error(`FSA manager getExerciseById: ${error}`);
        }
    }

    static async getAllExercise(): Promise<FSAType[]> {
        try {

            const exercises = await FSARepository.getAllExercises();
            return exercises;
        } catch (error) {
            throw new Error(`FSA manager getAllExercise: ${error}`);
        }
    }

    static async updateExercise(
        exerciseId: string,
        filedsToUpdate: Partial<FSAType>
    ): Promise<FSAType | null> {
        try {

            const updatedExercise = await FSARepository.updateExercise(
                exerciseId,
                filedsToUpdate
            );
            return updatedExercise;
        } catch (error) {
            throw new Error(`FSA manager updateExercise: ${error}`);
        }
    }

    static async deleteExercise(exerciseId: string): Promise<FSAType | null> {
        try {

            const status = await FSARepository.deleteExercise(exerciseId);
            return status;
        } catch (error) {
            throw new Error(`FSA manager deleteExercise: ${error}`);
        }
    }
}
