import Express from "express";
import CoursesManager from "./manager.js";
import CoursesModel from "./model.js";
import capitalizeWords from "../utils/capitalizeWords.js";

export default class CoursesController {
    static async create(req: Express.Request, res: Express.Response) {
        try {
            const { name, units } = req.body as {
                name: string;
                units?: string[]
            };

            const isExisted = await CoursesModel.findOne({ name: name });
            if (isExisted) {
                console.error('course already existed');
                return res.status(403).json({ error: 'course already existed' });
            }


            const course: {
                name: string, units?: string[]
            } = { name: capitalizeWords(name), units: units };


            const newCourse = await CoursesManager.createCourse(course);
            if (!!newCourse) {
                return res.status(201).json({ message: "course created successfully", newCourse });
            } else {
                throw new Error('Course controller create error.');
            }
        } catch (error: any) {
            console.error('Controller Error:', error.message);
            res.status(400).json({ error: error.message });
        }
    }

    static async getById(req: Express.Request, res: Express.Response) {
        try {
            const courseId: string = req.params.id;
            console.log("courses controller", courseId);
            const course = await CoursesManager.getCourseById(courseId);
            if (!course) {
                return res.status(404).json({ message: "course not found" });
            }

            res.status(200).json({ course });
        } catch (error: any) {
            console.error('Controller Error:', error.message);
            res.status(500).json({ error: error.message });
        }
    }

    static async getByName(req: Express.Request, res: Express.Response) {
        try {
            const courseName: string = req.params.courseName;
            console.log("courses controller - getByName", courseName);
            const course = await CoursesManager.getCourseByName(capitalizeWords(courseName));
            if (!course) {
                return res.status(404).json({ message: "course not found" });
            }

            res.status(200).json({ course });
        } catch (error: any) {
            console.error('Controller Error:', error.message);
            res.status(500).json({ error: error.message });
        }
    }

    static async getUnitsById(req: Express.Request, res: Express.Response) {
        try {
            const courseId: string = req.params.id;
            console.log("controller: getUnitsById", courseId);
            const units = await CoursesManager.getUnitsByCourseId(courseId);
            if (!units) {
                return res.status(404).json({ message: "units not found" });
            }

            res.status(200).json({ units });
        } catch (error: any) {
            console.error('Controller Error:', error.message);
            res.status(500).json({ error: error.message });
        }
    }

    static async getFirstLessonId(req: Express.Request, res: Express.Response) {
        try {
            const courseId: string = req.params.id;
            console.log("controller: getFirstLessonId", courseId);
            const lessonId = await CoursesManager.getFirstLessonId(courseId);
            if (!lessonId) {
                return res.status(404).json({ message: "lesson not found" });
            }

            res.status(200).json({ lessonId });
        } catch (error: any) {
            console.error('Controller Error:', error.message);
            res.status(500).json({ error: error.message });
        }
    }

    static async getNextUnitId(req: Express.Request, res: Express.Response) {
        try {
            const pervUnitId: string = req.params.pervUnitId as string;
            console.log("course controller: pervUnitId", pervUnitId);
            const nextUnitId = await CoursesManager.getNextUnitId(pervUnitId);
            if (!nextUnitId) {
                return res.status(404).json({ message: "nextUnitId not found" });
            }

            res.status(200).json({ nextUnitId });
        } catch (error: any) {
            console.error('Controller Error:', error.message);
            res.status(500).json({ error: error.message });
        }
    }

    static async getMany(_req: Express.Request, res: Express.Response) {
        try {
            const courses = await CoursesManager.getAllCourses();
            console.log("get all courses", courses);
            res.status(200).json({ courses });
        } catch (error: any) {
            console.error('Controller Error:', error.message);
            res.status(500).json({ error: error.message });
        }
    }

    static async update(req: Express.Request, res: Express.Response) {
        try {
            const courseId: string = req.params.id;
            const fieldsToUpdate: Partial<CoursesType> = req.body;

            const updatedCouse = await CoursesManager.updateCourse(
                courseId,
                fieldsToUpdate
            );

            if (!updatedCouse) {
                return res.status(404).json({ message: "unit not found" });
            }

            res.status(200).json({ updatedCouse });
        } catch (error: any) {
            console.error('Controller Error:', error.message);
            res.status(500).json({ error: error.message });
        }
    }

    static async delete(req: Express.Request, res: Express.Response) {
        try {
            const courseId: string = req.params.id;
            const status = await CoursesManager.deleteCourse(courseId);

            if (!status) {
                return res.status(404).json({ message: "Course not found" });
            }

            res.status(200).json({ status });
        } catch (error: any) {
            console.error('Controller Error:', error.message);
            res.status(500).json({ error: error.message });
        }
    }
}
