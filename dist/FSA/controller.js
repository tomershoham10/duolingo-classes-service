import FSAManager from "./manager.js";
export default class FSAController {
    static async create(req, res) {
        try {
            const { recordsKeys, difficultyLevel, relevant, answersList, acceptableAnswers, timeBuffers, description, sonolistKeys } = req.body;
            let reqExercise = {
                recordsKeys: recordsKeys,
                difficultyLevel: difficultyLevel,
                answersList: answersList,
                timeBuffers: timeBuffers,
            };
            acceptableAnswers ? reqExercise = { ...reqExercise, acceptableAnswers } : null;
            relevant ? reqExercise = { ...reqExercise, relevant } : null;
            description ? reqExercise = { ...reqExercise, description } : null;
            sonolistKeys ? reqExercise = { ...reqExercise, sonolistKeys } : null;
            const newExercise = await FSAManager.createExercise(reqExercise);
            if (!!newExercise) {
                return res.status(201).json({ message: "Exercise created successfully", newExercise });
            }
            else {
                throw new Error('Course controller create error.');
            }
        }
        catch (error) {
            console.error('Controller Error:', error.message);
            res.status(500).json({ error: error.message });
        }
    }
    static async getResultByUserAndFSAId(req, res) {
        try {
            const exerciseId = req.params.exerciseId;
            const userId = req.params.userId;
            console.log("FSA controller getResultByUserAndFSAId", exerciseId, userId);
            const result = await FSAManager.getResultByUserAndFSAId(exerciseId, userId);
            console.log("FSA controller getResultByUserAndFSAId - result", result, result === null);
            if (!result) {
                return res.status(404).json({ message: "result not found" });
            }
            return res.status(200).json({ result });
        }
        catch (error) {
            console.error('Controller Error:', error.message);
            res.status(500).json({ error: error.message });
        }
    }
    static async getRelevantByFSAId(req, res) {
        try {
            const exerciseId = req.params.exerciseId;
            console.log("FSA controller getRelevantByFSAId", exerciseId);
            const relevantTargets = await FSAManager.getRelevantByFSAId(exerciseId);
            if (!relevantTargets) {
                return res.status(404).json({ message: "relevant not found" });
            }
            return res.status(200).json({ relevantTargets });
        }
        catch (error) {
            console.error('Controller Error:', error.message);
            res.status(500).json({ error: error.message });
        }
    }
    static async getAnswersByFSAId(req, res) {
        try {
            const exerciseId = req.params.exerciseId;
            console.log("FSA controller getAnswersByFSAId", exerciseId);
            const answers = await FSAManager.getAnswersByFSAId(exerciseId);
            if (!answers) {
                return res.status(404).json({ message: "targets not found" });
            }
            return res.status(200).json({ answers });
        }
        catch (error) {
            console.error('Controller Error:', error.message);
            res.status(500).json({ error: error.message });
        }
    }
    static async getByAnswerId(req, res) {
        try {
            const answerId = req.params.answerId;
            console.log("FSA controller getByAnswerId", answerId);
            const exercises = await FSAManager.getExerciseByAnswerId(answerId);
            if (!exercises) {
                return res.status(404).json({ message: "Exercise not found" });
            }
            return res.status(200).json({ exercises });
        }
        catch (error) {
            console.error('Controller Error:', error.message);
            res.status(500).json({ error: error.message });
        }
    }
    static async getById(req, res) {
        try {
            const exerciseId = req.params.id;
            console.log("FSA controller", exerciseId);
            const exercise = await FSAManager.getExerciseById(exerciseId);
            if (!exercise) {
                return res.status(404).json({ message: "Exercise not found" });
            }
            return res.status(200).json({ exercise });
        }
        catch (error) {
            console.error('Controller Error:', error.message);
            res.status(500).json({ error: error.message });
        }
    }
    static async getMany(_req, res) {
        try {
            const exercises = await FSAManager.getAllExercise();
            console.log(exercises);
            return res.status(200).json({ exercises });
        }
        catch (error) {
            console.error('Controller Error:', error.message);
            res.status(500).json({ error: error.message });
        }
    }
    static async update(req, res) {
        try {
            const exerciseId = req.params.id;
            const fieldsToUpdate = req.body;
            const updatedExercise = await FSAManager.updateExercise(exerciseId, fieldsToUpdate);
            if (!updatedExercise) {
                return res.status(404).json({ message: "Exercise not found" });
            }
            return res.status(200).json({ updatedExercise });
        }
        catch (error) {
            console.error('Controller Error:', error.message);
            res.status(500).json({ error: error.message });
        }
    }
    static async delete(req, res) {
        try {
            const exerciseId = req.params.id;
            const status = await FSAManager.deleteExercise(exerciseId);
            if (!status) {
                return res.status(404).json({ message: "Exercise not found" });
            }
            return res.status(200).json({ status });
        }
        catch (error) {
            console.error('Controller Error:', error.message);
            res.status(500).json({ error: error.message });
        }
    }
}
//# sourceMappingURL=controller.js.map