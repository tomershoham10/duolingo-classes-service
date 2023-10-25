import Express, { NextFunction } from "express";
import CoursesManager from "./manager.js";

export default class CoursesController {
    static async create(
        req: Express.Request,
        res: Express.Response,
        next: NextFunction
    ) {
        try {
            const { type, units } = req.body as {
                type: TypesOfCourses,
                units: string[]
            };

            const course: {
                type: TypesOfCourses,
                units: string[]
            } = { type: type, units: units };


            const newCourse = await CoursesManager.createCourse(course);
            res.status(201)
                .json({ message: "course created successfully", newCourse });
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
            const coursesId: string = req.params.id;
            console.log("courses controller", coursesId);
            const course = await CoursesManager.getCourseById(coursesId);
            if (!course) {
                return res.status(404).json({ message: "course not found" });
            }

            res.status(200).json({ course });
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
            const courses = await CoursesManager.getAllCourses();
            console.log("get all courses", courses);
            res.status(200).json({ courses });
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
            const coursesId: string = req.params.id;
            const fieldsToUpdate: Partial<CoursesType> = req.body;

            const updatedCouse = await CoursesManager.updateCourse(
                coursesId,
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
            const coursesId: string = req.params.id;
            const status = await CoursesManager.deleteCourses(coursesId);

            if (!status) {
                return res.status(404).json({ message: "Course not found" });
            }

            res.status(200).json({ status });
        } catch (error) {
            next(error);
        }
    }
}