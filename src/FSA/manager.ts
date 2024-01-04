import FSARepository from "./repository.js";

export default class FSAManager {
    static async createExercise(
        exercise: Partial<FSAType>): Promise<FSAType> {
        try {

            const response = await FSARepository.createExercise(exercise);
            return response
        } catch (error: any) {
            console.error('Manager Error [createExercise]:', error.message);
            throw new Error('Error in createExercise');
        }
    }

    static async getResultByUserAndFSAId(exerciseId: string, useId: string): Promise<ResultType | undefined | null> {
        try {
            console.log("FSA manager getResultByUserAndFSAId - exerciseId", exerciseId);
            const result = await FSARepository.getResultByUserAndFSAId(exerciseId, useId);
            console.log("FSA manager getResultByUserAndFSAId - result", result);
            return result;
        } catch (error: any) {
            console.error('Manager Error [getResultByUserAndFSAId]:', error.message);
            throw new Error('Error in getResultByUserAndFSAId');
        }
    }

    static async getRelevantByFSAId(exerciseId: string): Promise<TargetType[] | undefined | null> {
        try {
            console.log("FSA manager getRelevantByFSAId - exerciseId", exerciseId);
            const relevant = await FSARepository.getRelevantByFSAId(exerciseId);
            console.log("FSA manager getRelevantByFSAId - relevant targets", relevant);
            return relevant;
        } catch (error: any) {
            console.error('Manager Error [getRelevantByFSAId]:', error.message);
            throw new Error('Error in getRelevantByFSAId');
        }
    }

    static async getAnswersByFSAId(exerciseId: string): Promise<TargetType[] | undefined | null> {
        try {
            console.log("FSA manager getAnswersByFSAId - exerciseId", exerciseId);
            const targets = await FSARepository.getAnswersByFSAId(exerciseId);
            console.log("FSA manager getAnswersByFSAId - targets", targets);
            return targets;
        } catch (error: any) {
            console.error('Manager Error [getAnswersByFSAId]:', error.message);
            throw new Error('Error in getAnswersByFSAId');
        }
    }

    static async getExerciseByAnswerId(answerId: string): Promise<FSAType[] | null> {
        try {

            const exercises = await FSARepository.getExerciseByAnswerId(answerId);
            console.log("FSA manager getExerciseByAnswerId", exercises);
            return exercises;
        } catch (error: any) {
            console.error('Manager Error [getExerciseByAnswerId]:', error.message);
            throw new Error('Error in getExerciseByAnswerId');
        }
    }

    static async getExerciseById(exerciseId: string): Promise<FSAType | null> {
        try {

            const exercise = await FSARepository.getExerciseById(exerciseId);
            console.log("FSA manager", exercise);
            return exercise;
        } catch (error: any) {
            console.error('Manager Error [getExerciseByAnswerId]:', error.message);
            throw new Error('Error in getExerciseByAnswerId');
        }
    }

    static async getAllExercise(): Promise<FSAType[]> {
        try {

            const exercises = await FSARepository.getAllExercises();
            return exercises;
        } catch (error: any) {
            console.error('Manager Error [getAllExercise]:', error.message);
            throw new Error('Error in getAllExercise');
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
        } catch (error: any) {
            console.error('Manager Error [updateExercise]:', error.message);
            throw new Error('Error in updateExercise');
        }
    }

    static async deleteExercise(exerciseId: string): Promise<FSAType | null> {
        try {

            const status = await FSARepository.deleteExercise(exerciseId);
            return status;
        } catch (error: any) {
            console.error('Manager Error [deleteExercise]:', error.message);
            throw new Error('Error in deleteExercise');
        }
    }
}
