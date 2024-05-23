import { getFromCache, resetNamespaceCache, setToCache } from "../utils/cache.js";
import FSARepository from "./repository.js";

export default class FSAManager {
    static async createExercise(
        exercise: Partial<FSAType>): Promise<FSAType> {
        try {

            const response = await FSARepository.createExercise(exercise);
            await setToCache('FSAs', response._id, JSON.stringify(response), 3600);
            await resetNamespaceCache('getAllFSAs', 'allFSAs');

            return response
        } catch (error: any) {
            console.error('Manager Error [createExercise]:', error.message);
            throw new Error('Error in createExercise');
        }
    }

    static async getResultByUserAndFSAId(exerciseId: string, useId: string): Promise<ResultType | undefined | null> {
        try {
            const cachedResult = await getFromCache('getResultByUserAndFSAId', exerciseId + useId);
            if (cachedResult) {
                console.log("Cache hit: FSA manager - getResultByUserAndFSAId", exerciseId, useId);
                return JSON.parse(cachedResult); // Parse cached JSON data
            }
            console.log("FSA manager getResultByUserAndFSAId - exerciseId", exerciseId);
            const result = await FSARepository.getResultByUserAndFSAId(exerciseId, useId);
            result !== null ? await setToCache('getResultByUserAndFSAId', exerciseId + useId, JSON.stringify(result), 36000) : null;
            console.log("FSA manager getResultByUserAndFSAId - result", result);
            return result;
        } catch (error: any) {
            console.error('Manager Error [getResultByUserAndFSAId]:', error.message);
            throw new Error('Error in getResultByUserAndFSAId');
        }
    }

    static async getRelevantByFSAId(exerciseId: string): Promise<TargetType[] | null> {
        try {
            const cachedRelevant = await getFromCache('getRelevantByFSAId', exerciseId);
            if (cachedRelevant) {
                console.log("Cache hit: FSA manager - getRelevantByFSAId", exerciseId);
                return JSON.parse(cachedRelevant); // Parse cached JSON data
            }
            console.log("FSA manager getRelevantByFSAId - exerciseId", exerciseId);
            const relevant = await FSARepository.getRelevantByFSAId(exerciseId);
            relevant !== null ? await setToCache('getRelevantByFSAId', exerciseId, JSON.stringify(relevant), 36000) : null;

            console.log("FSA manager getRelevantByFSAId - relevant targets", relevant);
            return relevant;
        } catch (error: any) {
            console.error('Manager Error [getRelevantByFSAId]:', error.message);
            throw new Error('Error in getRelevantByFSAId');
        }
    }

    static async getAnswersByFSAId(exerciseId: string): Promise<TargetType[] | undefined | null> {
        try {
            const cachedTargets = await getFromCache('getAnswersByFSAId', exerciseId);
            if (cachedTargets) {
                console.log("Cache hit: FSA manager - getAnswersByFSAId", exerciseId);
                return JSON.parse(cachedTargets); // Parse cached JSON data
            }
            console.log("FSA manager getAnswersByFSAId - exerciseId", exerciseId);
            const targets = await FSARepository.getAnswersByFSAId(exerciseId);
            targets !== null ? await setToCache('getAnswersByFSAId', exerciseId, JSON.stringify(targets), 36000) : null;

            console.log("FSA manager getAnswersByFSAId - targets", targets);
            return targets;
        } catch (error: any) {
            console.error('Manager Error [getAnswersByFSAId]:', error.message);
            throw new Error('Error in getAnswersByFSAId');
        }
    }

    static async getExerciseByAnswerId(answerId: string): Promise<FSAType[] | null> {
        try {
            const cachedExercises = await getFromCache('getExerciseByAnswerId', answerId);
            if (cachedExercises) {
                console.log("Cache hit: FSA manager - getExerciseByAnswerId", answerId);
                return JSON.parse(cachedExercises); // Parse cached JSON data
            }
            const exercises = await FSARepository.getExerciseByAnswerId(answerId);
            exercises !== null ? await setToCache('getExerciseByAnswerId', answerId, JSON.stringify(exercises), 360) : null;
            console.log("FSA manager getExerciseByAnswerId", exercises);
            return exercises;
        } catch (error: any) {
            console.error('Manager Error [getExerciseByAnswerId]:', error.message);
            throw new Error('Error in getExerciseByAnswerId');
        }
    }

    static async getExerciseById(exerciseId: string): Promise<FSAType | null> {
        try {
            const cachedExercise = await getFromCache('getFSAById', exerciseId);
            if (cachedExercise) {
                console.log("Cache hit: FSA manager - getExerciseById", exerciseId);
                return JSON.parse(cachedExercise); // Parse cached JSON data
            }
            const exercise = await FSARepository.getExerciseById(exerciseId);
            exercise !== null ? await setToCache('getExerciseById', exerciseId, JSON.stringify(exercise), 36000) : null;
            console.log("FSA manager", exercise);
            return exercise;
        } catch (error: any) {
            console.error('Manager Error [getExerciseByAnswerId]:', error.message);
            throw new Error('Error in getExerciseByAnswerId');
        }
    }

    static async getAllExercise(): Promise<FSAType[]> {
        try {
            const cachedFSAs = await getFromCache('getAllFSAs', 'allFSAs');
            if (cachedFSAs) {
                console.log("Cache hit: FSAs manager - getAllExercise", cachedFSAs);
                return JSON.parse(cachedFSAs); // Parse cached JSON data
            }
            const exercises = await FSARepository.getAllExercises();
            await setToCache('getAllFSAs', 'allFSAs', JSON.stringify(exercises), 3600);
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
            await setToCache('FSAs', exerciseId, JSON.stringify(updatedExercise), 3600);
            await resetNamespaceCache('getAllFSAs', 'allFSAs');

            return updatedExercise;
        } catch (error: any) {
            console.error('Manager Error [updateExercise]:', error.message);
            throw new Error('Error in updateExercise');
        }
    }

    static async deleteExercise(exerciseId: string): Promise<FSAType | null> {
        try {

            const status = await FSARepository.deleteExercise(exerciseId);
            status ? await resetNamespaceCache('FSAs', exerciseId) : null;
            await resetNamespaceCache('getAllFSAs', 'allFSAs');

            return status;
        } catch (error: any) {
            console.error('Manager Error [deleteExercise]:', error.message);
            throw new Error('Error in deleteExercise');
        }
    }
}
