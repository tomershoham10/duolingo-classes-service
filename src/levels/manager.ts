import LevelsRepository from "./repository.js";

export default class LevelsManager {
    static async createLevel(
        level: Partial<LevelsType>): Promise<LevelsType> {
        try {

            const response = await LevelsRepository.createLevel(level);
            return response
        }
        catch (err) {
            throw new Error(`Error manager createLevel: ${err}`);
        }
    }

    static async getLevelById(levelId: string): Promise<LevelsType | null> {
        try {

            const level = await LevelsRepository.getLevelById(levelId);
            console.log("levels manager", level);
            return level;
        }
        catch (err) {
            throw new Error(`Error manager getLevelById: ${err}`);
        }
    }

    static async getsLessonsByLevelId(levelId: string): Promise<LessonsType[] | null | undefined> {
        try {
            const lessons = await LevelsRepository.getsLessonsByLevelId(levelId);
            console.log("levels manager getsLessonsByLevelId", lessons);
            return lessons;
        }
        catch (err) {
            throw new Error(`Error manager getsLessonsByLevelId: ${err}`);
        }
    }

    static async getNextLessonId(prevLessonId: string): Promise<string | null> {
        try {
            const nextLessonId = await LevelsRepository.getNextLessonId(prevLessonId);
            console.log("levels manager getNextLessonId", nextLessonId, prevLessonId);
            return nextLessonId;
        }
        catch (err) {
            throw new Error(`Error manager getNextLessonId: ${err}`);
        }
    }

    static async getAllLevels(): Promise<LevelsType[] | null> {
        try {

            const levels = await LevelsRepository.getAllLevels();
            return levels;
        }
        catch (err) {
            throw new Error(`Error manager getAllLevels: ${err}`);
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
        catch (err) {
            throw new Error(`Error manager updateLevel: ${err}`);
        }
    }

    static async deleteLevel(levelId: string): Promise<LevelsType | null> {
        try {
            const status = await LevelsRepository.deleteLevel(levelId);
            return status;
        }
        catch (err) {
            throw new Error(`Error manager deleteLevel: ${err}`);
        }
    }
}  