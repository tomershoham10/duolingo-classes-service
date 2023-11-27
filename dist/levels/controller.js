import LevelsManager from "./manager.js";
export default class LevelsController {
    static async create(req, res, next) {
        try {
            const { lessons } = req.body;
            const reqLevel = {
                lessons: lessons,
            };
            const newLevel = await LevelsManager.createLevel(reqLevel);
            res.status(201)
                .json({ message: "Level created successfully", newLevel });
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ err: "Internal Server Error" });
            next(error);
        }
    }
    static async getById(req, res, next) {
        try {
            const levelId = req.params.id;
            console.log("levels controller", levelId);
            const level = await LevelsManager.getLevelById(levelId);
            if (!level) {
                return res.status(404).json({ message: "level not found" });
            }
            res.status(200).json({ level });
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ err: "Internal Server Error" });
            next(error);
        }
    }
    static async getLessonsById(req, res, next) {
        try {
            const levelId = req.params.id;
            console.log("controller: getLessonsById", levelId);
            const lessons = await LevelsManager.getsLessonsByLevelId(levelId);
            if (!lessons) {
                return res.status(404).json({ message: "lessons not found" });
            }
            res.status(200).json({ lessons });
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ err: "Internal Server Error" });
            next(error);
        }
    }
    static async getNextLessonId(req, res, next) {
        try {
            const prevLessonId = req.params.prevLessonId;
            console.log("controller: getNextLessonId", prevLessonId);
            const nextLessonId = await LevelsManager.getNextLessonId(prevLessonId);
            if (!nextLessonId) {
                return res.status(404).json({ message: "next lessonId not found" });
            }
            res.status(200).json({ nextLessonId });
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ err: "Internal Server Error" });
            next(error);
        }
    }
    static async getMany(_req, res, next) {
        try {
            const levels = await LevelsManager.getAllLevels();
            console.log(levels);
            res.status(200).json({ levels });
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ err: "Internal Server Error" });
            next(error);
        }
    }
    static async update(req, res, next) {
        try {
            const levelId = req.params.id;
            const fieldsToUpdate = req.body;
            const updatedLevel = await LevelsManager.updateLevel(levelId, fieldsToUpdate);
            if (!updatedLevel) {
                return res.status(404).json({ message: "Level not found" });
            }
            res.status(200).json({ updatedLevel });
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ err: "Internal Server Error" });
            next(error);
        }
    }
    static async delete(req, res, next) {
        try {
            const levelId = req.params.id;
            const status = await LevelsManager.deleteLevel(levelId);
            if (!status) {
                return res.status(404).json({ message: "Level not found" });
            }
            res.status(200).json({ status });
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ err: "Internal Server Error" });
            next(error);
        }
    }
}
//# sourceMappingURL=controller.js.map