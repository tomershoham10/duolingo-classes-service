import Express, { NextFunction } from "express";
import ResultsManager from "./manager.js";

export default class ResultsController {
    static async create(
        req: Express.Request,
        res: Express.Response,
        next: NextFunction
    ) {
        try {
            const { userId, date, exerciseId, answers, score } = req.body as {
                userId: string;
                date: Date;
                exerciseId: string;
                answers: string[];
                score: number;
            };

            const result: {
                userId: string;
                date: Date;
                exerciseId: string;
                answers: string[];
                score: number;
            } = { userId: userId, date: date, exerciseId: exerciseId, answers: answers, score: score };


            const newResult = await ResultsManager.createResult(result);
            res.status(201)
                .json({ message: "result created successfully", newResult });
        } catch (error) {
            next(error);
        }
    }

    static async getById(
        req: Express.Request,
        res: Express.Response,
        next: NextFunction
    ) {
        try {
            const resultId: string = req.params.id;
            console.log("results controller getById", resultId);
            const result = await ResultsManager.getResultById(resultId);
            if (!result) {
                return res.status(404).json({ message: "result not found" });
            }

            res.status(200).json({ result });
        } catch (error) {
            next(error);
        }
    }

    static async getResultsByUserId(
        req: Express.Request,
        res: Express.Response,
        next: NextFunction
    ) {
        try {
            const resultId: string = req.params.userId;
            console.log("controller: getResultsByUserId", resultId);
            const results = await ResultsManager.getResultsByUserId(resultId);
            if (!results) {
                return res.status(404).json({ message: "results not found" });
            }

            res.status(200).json({ results });
        } catch (error) {
            next(error);
        }
    }


    static async getMany(
        _req: Express.Request,
        res: Express.Response,
        next: NextFunction
    ) {
        try {
            const results = await ResultsManager.getAllResults();
            console.log("get all results controller", results);
            res.status(200).json({ results });
        } catch (err) {
            next(err);
            res.status(500).json({ err: "Internal Server Error" });
        }
    }

    static async update(
        req: Express.Request,
        res: Express.Response,
        next: NextFunction
    ) {
        try {
            const resultId: string = req.params.id;
            const fieldsToUpdate: Partial<CoursesType> = req.body;

            const updatedResult = await ResultsManager.updateResult(
                resultId,
                fieldsToUpdate
            );

            if (!updatedResult) {
                return res.status(404).json({ message: "result not found" });
            }

            res.status(200).json({ updatedResult });
        } catch (error) {
            next(error);
        }
    }

    static async delete(
        req: Express.Request,
        res: Express.Response,
        next: NextFunction
    ) {
        try {
            const resultId: string = req.params.id;
            const status = await ResultsManager.deleteResult(resultId);

            if (!status) {
                return res.status(404).json({ message: "Result not found" });
            }

            res.status(200).json({ status });
        } catch (error) {
            next(error);
        }
    }
}
