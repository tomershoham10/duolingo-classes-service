import FSAManager from "./manager.js";
export default class FSAController {
    static async create(req, res, next) {
        try {
            const { filesKeys, difficultyLevel, options, answers, firstTimeBuffer, secondTimeBuffer, description } = req.body;
            const reqExercise = {
                filesKeys: filesKeys,
                difficultyLevel: difficultyLevel,
                options: options,
                answers: answers,
                firstTimeBuffer: firstTimeBuffer,
                secondTimeBuffer: secondTimeBuffer,
                description: description
            };
            const newExercise = await FSAManager.createExercise(reqExercise);
            res.status(201)
                .json({ message: "Exercise created successfully", newExercise });
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ err: "Internal Server Error" });
            next(error);
        }
    }
    static async getOptionsByFSAId(req, res, next) {
        try {
            const exerciseId = req.params.exerciseId;
            console.log("FSA controller getOptionsByFSAId", exerciseId);
            const options = await FSAManager.getOptionsByFSAId(exerciseId);
            if (!options) {
                return res.status(404).json({ message: "options not found" });
            }
            res.status(200).json({ options });
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ err: "Internal Server Error" });
            next(error);
        }
    }
    static async getAnswersByFSAId(req, res, next) {
        try {
            const exerciseId = req.params.exerciseId;
            console.log("FSA controller getAnswersByFSAId", exerciseId);
            const options = await FSAManager.getAnswersByFSAId(exerciseId);
            if (!options) {
                return res.status(404).json({ message: "options not found" });
            }
            res.status(200).json({ options });
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ err: "Internal Server Error" });
            next(error);
        }
    }
    static async getByAnswerId(req, res, next) {
        try {
            const answerId = req.params.answerId;
            console.log("FSA controller getByAnswerId", answerId);
            const exercises = await FSAManager.getExerciseByAnswerId(answerId);
            if (!exercises) {
                return res.status(404).json({ message: "Exercise not found" });
            }
            res.status(200).json({ exercises });
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ err: "Internal Server Error" });
            next(error);
        }
    }
    static async getById(req, res, next) {
        try {
            const exerciseId = req.params.id;
            console.log("FSA controller", exerciseId);
            const exercise = await FSAManager.getExerciseById(exerciseId);
            if (!exercise) {
                return res.status(404).json({ message: "Exercise not found" });
            }
            res.status(200).json({ exercise });
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ err: "Internal Server Error" });
            next(error);
        }
    }
    static async getMany(_req, res, next) {
        try {
            const exercises = await FSAManager.getAllExercise();
            console.log(exercises);
            res.status(200).json({ exercises });
        }
        catch (err) {
            console.error(err);
            res.status(500).json({ err: "Internal Server Error" });
            next(err);
        }
    }
    static async update(req, res, next) {
        try {
            const exerciseId = req.params.id;
            const fieldsToUpdate = req.body;
            const updatedExercise = await FSAManager.updateExercise(exerciseId, fieldsToUpdate);
            if (!updatedExercise) {
                return res.status(404).json({ message: "Exercise not found" });
            }
            res.status(200).json({ updatedExercise });
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ err: "Internal Server Error" });
            next(error);
        }
    }
    static async delete(req, res, next) {
        try {
            const exerciseId = req.params.id;
            const status = await FSAManager.deleteExercise(exerciseId);
            if (!status) {
                return res.status(404).json({ message: "Exercise not found" });
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