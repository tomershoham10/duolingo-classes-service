import ResultsManager from "./manager.js";
import mongoose from "mongoose";
export default class ResultsController {
    static async create(req, res, next) {
        try {
            const { userId, date, lessonId, exerciseId, answers, score } = req.body;
            const result = { userId: userId, date: date, lessonId: lessonId, exerciseId: exerciseId, answers: answers, score: score };
            const newResult = await ResultsManager.createResult(result);
            res.status(201)
                .json({ message: "result created successfully", newResult });
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ err: "Internal Server Error" });
            next(error);
        }
    }
    static async getById(req, res, next) {
        try {
            const resultId = req.params.id;
            console.log("results controller getById", resultId);
            const result = await ResultsManager.getResultById(resultId);
            if (!result) {
                return res.status(404).json({ message: "result not found" });
            }
            res.status(200).json({ result });
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ err: "Internal Server Error" });
            next(error);
        }
    }
    static async getResultsByUserId(req, res, next) {
        try {
            const resultId = req.params.userId;
            console.log("controller: getResultsByUserId", resultId);
            const results = await ResultsManager.getResultsByUserId(resultId);
            if (!results) {
                return res.status(404).json({ message: "results not found" });
            }
            res.status(200).json({ results });
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ err: "Internal Server Error" });
            next(error);
        }
    }
    static async getResultsByLessonAndUser(req, res, next) {
        try {
            const lessonId = req.params.lessonId;
            const userId = req.params.userId;
            console.log("controller: getResultsByLessonAndUser", lessonId, userId);
            const results = await ResultsManager.getResultsByLessonAndUser(lessonId, userId);
            if (!results) {
                return res.status(404).json({ message: "results not found" });
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
            const results = await ResultsManager.getAllResults();
            console.log("get all results controller", results);
            res.status(200).json({ results });
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ err: "Internal Server Error" });
            next(error);
        }
    }
    static async update(req, res, next) {
        try {
            const resultId = req.params.id;
            const fieldsToUpdate = req.body;
            console.log("result controller - update - ", fieldsToUpdate);
            const updatedResult = await ResultsManager.updateResult(resultId, fieldsToUpdate);
            if (!updatedResult) {
                return res.status(404).json({ message: "result not found" });
            }
            res.status(200).json({ updatedResult });
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ err: "Internal Server Error" });
            next(error);
        }
    }
    static async submitExercise(req, res, next) {
        try {
            const session = await mongoose.startSession();
            session.startTransaction();
            const resultId = req.params.id;
            const fieldsToUpdate = req.body;
            console.log("result submitExercise - update - ", fieldsToUpdate);
            const updatedResult = await ResultsManager.updateResult(resultId, fieldsToUpdate);
            if (!updatedResult) {
                await session.abortTransaction();
                session.endSession();
                return res.status(404).json({ message: "result not found" });
            }
            //if result was updated successfully and the user finished the lesson,
            //update the user's next lessson id field
            res.status(200).json({ updatedResult });
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ err: "Internal Server Error" });
            next(error);
        }
    }
    static async delete(req, res, next) {
        try {
            const resultId = req.params.id;
            const status = await ResultsManager.deleteResult(resultId);
            if (!status) {
                return res.status(404).json({ message: "Result not found" });
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