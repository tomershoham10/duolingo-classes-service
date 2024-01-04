import mongoose from "mongoose";
import LevelsRepository from "./repository.js";
import LessonsManager from "../lessons/manager.js";

export default class LevelsManager {
    static async createLevel(): Promise<LevelsType> {
        const session = await mongoose.startSession();
        session.startTransaction();
        try {
            const createdLesson = await LessonsManager.createLesson({ name: 'Lesson no.1' });
            console.log("createLevel manager - createdLesson", createdLesson);

            const createdLevel = await LevelsRepository.createLevel({ lessons: [createdLesson._id] });
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

    static async getsLessonsByLevelId(levelId: string): Promise<LessonsType[] | null | undefined> {
        try {
            const lessons = await LevelsRepository.getsLessonsByLevelId(levelId);
            console.log("levels manager getsLessonsByLevelId", lessons);
            return lessons;
        }
        catch (error: any) {
            console.error('Manager Error [getsLessonsByLevelId]:', error.message);
            throw new Error('Error in getsLessonsByLevelId');
        }
    }

    static async getNextLessonId(prevLessonId: string): Promise<string | null> {
        try {
            const nextLessonId = await LevelsRepository.getNextLessonId(prevLessonId);
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

            const levels = await LevelsRepository.getAllLevels();
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
            return updatedLevel;
        }
        catch (error: any) {
            console.error('Manager Error [updateLevel]:', error.message);
            throw new Error('Error in updateLevel');
        }
    }

    static async deleteLevel(levelId: string): Promise<LevelsType | null> {
        try {
            const status = await LevelsRepository.deleteLevel(levelId);
            return status;
        }
        catch (error: any) {
            console.error('Manager Error [deleteLevel]:', error.message);
            throw new Error('Error in deleteLevel');
        }
    }
}  