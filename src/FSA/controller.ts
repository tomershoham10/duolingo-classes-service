import Express, { NextFunction } from "express";
import FSAManager from "./manager.js";

export default class FSAController {
    static async create(
        req: Express.Request,
        res: Express.Response,
        next: NextFunction
    ) {
        try {
            const { filesKeys, difficultyLevel, relevant, answers, firstTimeBuffer, secondTimeBuffer, description } = req.body as {
                filesKeys: string[],
                difficultyLevel: DifficultyLevel,
                relevant: string[],
                answers: string[],
                firstTimeBuffer: number,
                secondTimeBuffer: number,
                description: string,
            };
            const reqExercise = {
                filesKeys: filesKeys,
                difficultyLevel: difficultyLevel,
                relevant: relevant,
                answers: answers,
                firstTimeBuffer: firstTimeBuffer,
                secondTimeBuffer: secondTimeBuffer,
                description: description
            }

            const newExercise = await FSAManager.createExercise(reqExercise);
            return res.status(201)
                .json({ message: "Exercise created successfully", newExercise });
        } catch (error) {
            console.error(error);
            res.status(500).json({ err: "Internal Server Error" });
            next(error);
        }
    }

    static async getResultByUserAndFSAId(
        req: Express.Request,
        res: Express.Response,
        next: NextFunction
    ) {
        try {
            const exerciseId: string = req.params.exerciseId;
            const userId: string = req.params.userId;
            console.log("FSA controller getResultByUserAndFSAId", exerciseId, userId);
            const result = await FSAManager.getResultByUserAndFSAId(exerciseId, userId);
            console.log("FSA controller getResultByUserAndFSAId - result", result, result === null);
            // if (result === null) {
            //     console.log("result is null", result);
            //     return res.status(204).json({ message: "no result" });
            // }

            // console.log("try1", result);
            if (!result) {
                return res.status(404).json({ message: "result not found" });
            }

            return res.status(200).json({ result });
        } catch (error) {
            console.error(error);
            res.status(500).json({ err: "Internal Server Error" });
            next(error);
        }
    }

    static async getRelevantByFSAId(
        req: Express.Request,
        res: Express.Response,
        next: NextFunction
    ) {
        try {
            const exerciseId: string = req.params.exerciseId;
            console.log("FSA controller getRelevantByFSAId", exerciseId);
            const relevantOptions = await FSAManager.getRelevantByFSAId(exerciseId);
            if (!relevantOptions) {
                return res.status(404).json({ message: "relevant not found" });
            }

            return res.status(200).json({ relevantOptions });
        } catch (error) {
            console.error(error);
            res.status(500).json({ err: "Internal Server Error" });
            next(error);
        }
    }

    static async getAnswersByFSAId(
        req: Express.Request,
        res: Express.Response,
        next: NextFunction
    ) {
        try {
            const exerciseId: string = req.params.exerciseId;
            console.log("FSA controller getAnswersByFSAId", exerciseId);
            const answers = await FSAManager.getAnswersByFSAId(exerciseId);
            if (!answers) {
                return res.status(404).json({ message: "options not found" });
            }

            return res.status(200).json({ answers });
        } catch (error) {
            console.error(error);
            res.status(500).json({ err: "Internal Server Error" });
            next(error);
        }
    }

    static async getByAnswerId(
        req: Express.Request,
        res: Express.Response,
        next: NextFunction
    ) {
        try {
            const answerId: string = req.params.answerId;
            console.log("FSA controller getByAnswerId", answerId);
            const exercises = await FSAManager.getExerciseByAnswerId(answerId);
            if (!exercises) {
                return res.status(404).json({ message: "Exercise not found" });
            }

            return res.status(200).json({ exercises });
        } catch (error) {
            console.error(error);
            res.status(500).json({ err: "Internal Server Error" });
            next(error);
        }
    }

    static async getById(
        req: Express.Request,
        res: Express.Response,
        next: NextFunction
    ) {
        try {
            const exerciseId: string = req.params.id;
            console.log("FSA controller", exerciseId);
            const exercise = await FSAManager.getExerciseById(exerciseId);
            if (!exercise) {
                return res.status(404).json({ message: "Exercise not found" });
            }

            return res.status(200).json({ exercise });
        } catch (error) {
            console.error(error);
            res.status(500).json({ err: "Internal Server Error" });
            next(error);
        }
    }

    static async getMany(
        _req: Express.Request,
        res: Express.Response,
        next: NextFunction
    ) {
        try {
            const exercises = await FSAManager.getAllExercise();
            console.log(exercises);
            return res.status(200).json({ exercises });
        } catch (err) {
            console.error(err);
            res.status(500).json({ err: "Internal Server Error" });
            next(err);
        }
    }

    static async update(
        req: Express.Request,
        res: Express.Response,
        next: NextFunction
    ) {
        try {
            const exerciseId: string = req.params.id;
            const fieldsToUpdate: Partial<FSAType> = req.body;

            const updatedExercise = await FSAManager.updateExercise(
                exerciseId,
                fieldsToUpdate
            );

            if (!updatedExercise) {
                return res.status(404).json({ message: "Exercise not found" });
            }

            return res.status(200).json({ updatedExercise });
        } catch (error) {
            console.error(error);
            res.status(500).json({ err: "Internal Server Error" });
            next(error);
        }
    }

    static async delete(
        req: Express.Request,
        res: Express.Response,
        next: NextFunction
    ) {
        try {
            const exerciseId: string = req.params.id;
            const status = await FSAManager.deleteExercise(exerciseId);

            if (!status) {
                return res.status(404).json({ message: "Exercise not found" });
            }

            return res.status(200).json({ status });
        } catch (error) {
            console.error(error);
            res.status(500).json({ err: "Internal Server Error" });
            next(error);
        }
    }
}
