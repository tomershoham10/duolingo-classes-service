import LessonsManager from "./manager.js";
import LessonsModel from "./model.js";
export default class LessonsController {
    static async create(req, res, next) {
        try {
            const { name, exercises } = req.body;
            const reqLesson = {
                name: name,
                exercises: exercises,
            };
            const isExisted = await LessonsModel.findOne({ name: name });
            if (isExisted) {
                console.error('lesson already existed');
                return res.status(403).json({ error: 'lesson already existed' });
            }
            const newLesson = await LessonsManager.createLesson(reqLesson);
            res.status(201)
                .json({ message: "Lesson created successfully", newLesson });
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ err: "Internal Server Error" });
            next(error);
        }
    }
    static async getById(req, res, next) {
        try {
            const lessonId = req.params.id;
            console.log("lessons controller", lessonId);
            const lesson = await LessonsManager.getLessonById(lessonId);
            if (!lesson) {
                return res.status(404).json({ message: "lesson not found" });
            }
            res.status(200).json({ lesson });
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ err: "Internal Server Error" });
            next(error);
        }
    }
    static async getExercisesById(req, res, next) {
        try {
            const lessonId = req.params.id;
            console.log("lessons controller: getExercisesById", lessonId);
            const exercises = await LessonsManager.getsExercisesByLessonId(lessonId);
            if (exercises.length <= 0) {
                return res.status(404).json({ message: "Exercises not found" });
            }
            res.status(200).json({ exercises });
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ err: "Internal Server Error" });
            next(error);
        }
    }
    static async getUnsuspendedExercisesById(req, res, next) {
        try {
            const lessonId = req.params.id;
            console.log("lessons controller: getUnsuspendedExercisesById", lessonId);
            const exercises = await LessonsManager.getsUnsuspendedExercisesByLessonId(lessonId);
            if (exercises.length <= 0) {
                return res.status(404).json({ message: "Exercises not found" });
            }
            res.status(200).json({ exercises });
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ err: "Internal Server Error" });
            next(error);
        }
    }
    static async getResultsByLessonAndUser(req, res, next) {
        try {
            const { lessonId, userId } = req.params;
            console.log("lessons controller: getResultsById", "lessonId", lessonId, "userId", userId);
            const results = await LessonsManager.getResultsByLessonIdAndUserId(lessonId, userId);
            if (!results) {
                return res.status(404).json({ message: "Results not found" });
            }
            res.status(200).json({ results });
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ err: "Internal Server Error" });
            next(error);
        }
    }
    static async getMany(_req, res, next) {
        try {
            const lessons = await LessonsManager.getAllLessons();
            console.log(lessons);
            res.status(200).json({ lessons });
        }
        catch (err) {
            console.error(err);
            res.status(500).json({ err: "Internal Server Error" });
            next(err);
        }
    }
    static async update(req, res, next) {
        try {
            const lessonId = req.params.id;
            const fieldsToUpdate = req.body;
            const updatedLesson = await LessonsManager.updateLesson(lessonId, fieldsToUpdate);
            if (!updatedLesson) {
                return res.status(404).json({ message: "Lesson not found" });
            }
            res.status(200).json({ updatedLesson });
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ err: "Internal Server Error" });
            next(error);
        }
    }
    static async delete(req, res, next) {
        try {
            const lessonId = req.params.id;
            const status = await LessonsManager.deleteLesson(lessonId);
            if (!status) {
                return res.status(404).json({ message: "Lesson not found" });
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