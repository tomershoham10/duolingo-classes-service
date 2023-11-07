import LessonsModel from "../lessons/model.js";
import LevelsModel from "./model.js";

export default class LevelsRepository {
    static async createLevel(level: Partial<LevelsType>): Promise<LevelsType> {
        try {
            const newlevel = await LevelsModel.create(level);
            return newlevel;
        } catch (err) {
            throw new Error(`Error repo createlevel: ${err}`);
        }
    }

    static async getLevelById(levelId: string): Promise<LevelsType | null> {
        try {
            const level = await LevelsModel.findById(levelId);
            console.log("levels repo", levelId);
            return level;
        } catch (err) {
            throw new Error(`Error repo getLevelById: ${err}`);
        }
    }

    static async getsLessonsByLevelId(levelId: string): Promise<LessonsType[] | undefined | null> {
        try {
            const level = await LevelsModel.findById(levelId);
            if (level) {
                const lessonsIds = level.lessons;

                const lessonsDetails = await LessonsModel.find({ _id: { $in: lessonsIds } });

                if (lessonsIds) {
                    const lessonsInOrder = lessonsIds.map((id: any) => lessonsDetails.find(lesson => lesson._id.equals(id)));

                    console.log("levels repo getsLessonsByLevelId", levelId);
                    return lessonsInOrder as LessonsType[];
                }
            }
            else return null
        } catch (err) {
            throw new Error(`Error repo getsLessonsByLevelId: ${err}`);
        }
    }


    static async getAllLevels(): Promise<LevelsType[] | null> {
        try {
            const levels = await LevelsModel.find({});
            console.log("repo getAllLevels", levels);
            return levels;
        } catch (err) {
            throw new Error(`Error repo getAllLevels: ${err}`);
        }
    }

    static async updateLevel(
        levelId: string,
        fieldsToUpdate: Partial<LevelsType>
    ): Promise<LevelsType | null> {
        try {
            const updatedLevel = await LevelsModel.findByIdAndUpdate(
                levelId,
                fieldsToUpdate,
                { new: true }
            );
            console.log("lessons repo updateLevel", updatedLevel);
            return updatedLevel;
        } catch (err) {
            throw new Error(`Error repo updateLevel: ${err}`);
        }
    }

    static async deleteLevel(levelId: string): Promise<LevelsType | null> {
        try {
            const status = await LevelsModel.findOneAndDelete({ _id: levelId });
            console.log("lessons repo deleteLevel", status);
            return status;
        } catch (err) {
            throw new Error(`Error repo deleteLevel: ${err}`);
        }
    }
}
