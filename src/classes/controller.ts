import Express, { NextFunction } from "express";
import ClassesManager from "./manager.js";

export default class ClassesController {
    static async create(
        req: Express.Request,
        res: Express.Response,
        next: NextFunction
    ) {
        try {
            const { type, units } = req.body as {
                type: TypesOfClasses,
                units: string[]
            };

            const reqClass: {
                type: TypesOfClasses,
                units: string[]
            } = { type: type, units: units };


            const newClass = await ClassesManager.createClass(reqClass);
            res.status(201)
                .json({ message: "Class created successfully", newClass });
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
            const classId: string = req.params.id;
            console.log("classes controller", classId);
            const resClass = await ClassesManager.getClassById(classId);
            if (!resClass) {
                return res.status(404).json({ message: "Class not found" });
            }

            res.status(200).json({ resClass });
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
            const classes = await ClassesManager.getAllClasses();
            console.log("get all classes", classes);
            res.status(200).json({ classes });
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
            const classId: string = req.params.id;
            const fieldsToUpdate: Partial<ClassesType> = req.body;

            const updatedCouse = await ClassesManager.updateClass(
                classId,
                fieldsToUpdate
            );

            if (!updatedCouse) {
                return res.status(404).json({ message: "unit not found" });
            }

            res.status(200).json({ updatedCouse });
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
            const classId: string = req.params.id;
            const status = await ClassesManager.deleteClass(classId);

            if (!status) {
                return res.status(404).json({ message: "Class not found" });
            }

            res.status(200).json({ status });
        } catch (error) {
            next(error);
        }
    }
}
