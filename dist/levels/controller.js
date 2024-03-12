import LevelsManager from "./manager.js";
export default class LevelsController {
    static async create(_req, res) {
        try {
            const newLevel = await LevelsManager.createLevel();
            if (!!newLevel) {
                return res.status(201).json({ message: "level created successfully", newLevel });
            }
            else {
                throw new Error('level controller create error.');
            }
        }
        catch (error) {
            console.error('Controller Error:', error.message);
            res.status(400).json({ error: error.message });
        }
    }
    static async getById(req, res) {
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
            console.error('Controller Error:', error.message);
            res.status(500).json({ error: error.message });
        }
    }
    static async getLessonsById(req, res) {
        try {
            const levelId = req.params.id;
            console.log("controller: getLessonsById", levelId);
            const lessons = await LevelsManager.getsLessonsByLevelId(levelId);
            if (lessons.length <= 0) {
                return res.status(404).json({ message: "lessons not found" });
            }
            res.status(200).json({ lessons });
        }
        catch (error) {
            console.error('Controller Error:', error.message);
            res.status(500).json({ error: error.message });
        }
    }
    static async getsUnsuspendedLessonsById(req, res) {
        try {
            const levelId = req.params.id;
            console.log("controller: getsUnsuspendedLessonsById", levelId);
            const lessons = await LevelsManager.getsUnsuspendedLessonsByLevelId(levelId);
            if (lessons.length <= 0) {
                return res.status(404).json({ message: "lessons not found" });
            }
            res.status(200).json({ lessons });
        }
        catch (error) {
            console.error('Controller Error:', error.message);
            res.status(500).json({ error: error.message });
        }
    }
    static async getNextLessonId(req, res) {
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
            console.error('Controller Error:', error.message);
            res.status(500).json({ error: error.message });
        }
    }
    static async getMany(_req, res) {
        try {
            const levels = await LevelsManager.getAllLevels();
            console.log(levels);
            res.status(200).json({ levels });
        }
        catch (error) {
            console.error('Controller Error:', error.message);
            res.status(500).json({ error: error.message });
        }
    }
    static async update(req, res) {
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
            console.error('Controller Error:', error.message);
            res.status(500).json({ error: error.message });
        }
    }
    static async delete(req, res) {
        try {
            const levelId = req.params.id;
            const status = await LevelsManager.deleteLevel(levelId);
            if (!status) {
                return res.status(404).json({ message: "Level not found" });
            }
            res.status(200).json({ status });
        }
        catch (error) {
            console.error('Controller Error:', error.message);
            res.status(500).json({ error: error.message });
        }
    }
}
//# sourceMappingURL=controller.js.map