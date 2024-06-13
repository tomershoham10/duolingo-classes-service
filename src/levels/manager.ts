import { startSession } from "mongoose";
import LevelsRepository from "./repository.js";
import LessonsManager from "../lessons/manager.js";
import { getFromCache, resetNamespaceCache, setToCache } from "../utils/cache.js";

export default class LevelsManager {
    static async createLevel(): Promise<LevelsType> {
        const session = await startSession();
        session.startTransaction();
        try {
            const createdLesson = await LessonsManager.createLesson({ name: 'Lesson no.1' });
            console.log("createLevel manager - createdLesson", createdLesson);

            const createdLevel = await LevelsRepository.createLevel({ lessons: [createdLesson._id] });
            await setToCache('levels', createdLevel._id, JSON.stringify(createdLevel), 3600);
            await resetNamespaceCache('getAllLevels', 'allLevels');

            await session.commitTransaction();
            return createdLevel;
        }
        catch (error: any) {
            await session.abortTransaction();
            console.error('Manager Error [createLevel]:', error.message);
            throw new Error('Error in level creation process');
        } finally {
            session.endSession();
        }
    }

    static async getLevelById(levelId: string): Promise<LevelsType | null> {
        try {

            const level = await LevelsRepository.getLevelById(levelId);
            console.log("levels manager", level);
            return level;
        }
        catch (error: any) {
            console.error('Manager Error [getLevelById]:', error.message);
            throw new Error('Error in getLevelById');
        }
    }

    static async getsLessonsByLevelId(levelId: string): Promise<LessonsType[]> {
        try {
            const cachedLesson = await getFromCache('getsLessonsByLevelId', levelId);
            if (cachedLesson) {
                console.log("Cache hit: levels manager - getsLessonsByLevelId", levelId);
                return JSON.parse(cachedLesson); // Parse cached JSON data
            }

            const lessons = await LevelsRepository.getsLessonsByLevelId(levelId);
            lessons !== null ? await setToCache('getsLessonsByLevelId', levelId, JSON.stringify(lessons), 3600) : null;

            console.log("levels manager getsLessonsByLevelId", lessons);
            return lessons;
        }
        catch (error: any) {
            console.error('Manager Error [getsLessonsByLevelId]:', error.message);
            throw new Error('Error in getsLessonsByLevelId');
        }
    }

    static async getsUnsuspendedLessonsByLevelId(levelId: string): Promise<LessonsType[]> {
        try {
            const cachedLesson = await getFromCache('getsUnsuspendedLessonsByLevelId', levelId);
            if (cachedLesson) {
                console.log("Cache hit: levels manager - getsUnsuspendedLessonsByLevelId", levelId);
                return JSON.parse(cachedLesson); // Parse cached JSON data
            }
            const lessons = await LevelsRepository.getsUnsuspendedLessonsByLevelId(levelId);
            lessons !== null ? await setToCache('getsUnsuspendedLessonsByLevelId', levelId, JSON.stringify(lessons), 3600) : null;
            console.log("levels manager getsUnsuspendedLessonsByLevelId", lessons);
            return lessons;
        }
        catch (error: any) {
            console.error('Manager Error [getsUnsuspendedLessonsByLevelId]:', error.message);
            throw new Error('Error in getsUnsuspendedLessonsByLevelId');
        }
    }

    static async getNextLessonId(prevLessonId: string): Promise<string | null> {
        try {
            const cachedLesson = await getFromCache('getNextLessonId', prevLessonId);
            if (cachedLesson) {
                console.log("Cache hit: levels manager - getNextLessonId", prevLessonId);
                return JSON.parse(cachedLesson); // Parse cached JSON data
            }
            const nextLessonId = await LevelsRepository.getNextLessonId(prevLessonId);
            await setToCache('getNextLessonId', prevLessonId, JSON.stringify(nextLessonId), 3600)
            console.log("levels manager getNextLessonId", nextLessonId, prevLessonId);
            return nextLessonId;
        }
        catch (error: any) {
            console.error('Manager Error [getNextLessonId]:', error.message);
            throw new Error('Error in getNextLessonId');
        }
    }

    static async getAllLevels(): Promise<LevelsType[]> {
        try {
            const cachedLevels = await getFromCache('getAllLevels', 'allLevels');
            if (cachedLevels) {
                console.log("Cache hit: levels manager - getAllLevels", cachedLevels);
                return JSON.parse(cachedLevels); // Parse cached JSON data
            }

            const levels = await LevelsRepository.getAllLevels();
            await setToCache('getAllLevels', 'allLevels', JSON.stringify(levels), 3600);

            return levels;
        }
        catch (error: any) {
            console.error('Manager Error [getAllLevels]:', error.message);
            throw new Error('Error in getAllLevels');
        }
    }

    static async updateLevel(
        levelId: string,
        filedsToUpdate: Partial<LevelsType>
    ): Promise<LevelsType | null> {
        try {
            const updatedLevel = await LevelsRepository.updateLevel(
                levelId,
                filedsToUpdate
            );
            await setToCache('levels', levelId, JSON.stringify(updatedLevel), 3600);
            await resetNamespaceCache('getAllLevels', 'allLevels');

            return updatedLevel;
        }
        catch (error: any) {
            console.error('Manager Error [updateLevel]:', error.message);
            throw new Error('Error in updateLevel');
        }
    }

    static async suspendLessonById(
        levelId: string,
        lessonId: string,
    ): Promise<LevelsType | null> {
        try {
            const updatedLevel = await LevelsRepository.suspendLessonById(
                levelId,
                lessonId
            );
            await setToCache('levels', levelId, JSON.stringify(updatedLevel), 3600);
            await resetNamespaceCache('getAllLevels', 'allLevels');

            return updatedLevel;
        }
        catch (error: any) {
            console.error('Manager Error [suspendLessonById]:', error.message);
            throw new Error('Error in suspendLessonById');
        }
    }

    static async unsuspendLessonById(
        levelId: string,
        lessonId: string,
    ): Promise<LevelsType | null> {
        try {
            const updatedLevel = await LevelsRepository.unsuspendLessonById(
                levelId,
                lessonId
            );
            await setToCache('levels', levelId, JSON.stringify(updatedLevel), 3600);
            await resetNamespaceCache('getAllLevels', 'allLevels');

            return updatedLevel;
        }
        catch (error: any) {
            console.error('Manager Error [unsuspendLessonById]:', error.message);
            throw new Error('Error in unsuspendLessonById');
        }
    }

    static async deleteLevel(levelId: string): Promise<LevelsType | null> {
        try {
            const status = await LevelsRepository.deleteLevel(levelId);
            status ? await resetNamespaceCache('levels', levelId) : null;
            await resetNamespaceCache('getAllLevels', 'allLevels');

            return status;
        }
        catch (error: any) {
            console.error('Manager Error [deleteLevel]:', error.message);
            throw new Error('Error in deleteLevel');
        }
    }
}  