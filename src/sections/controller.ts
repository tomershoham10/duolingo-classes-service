import Express, { NextFunction } from "express";
import SectionsManager from "./manager.js";

export default class SectionsController {
    static async create(
        req: Express.Request,
        res: Express.Response,
        next: NextFunction
    ) {
        try {
            const { lessons } = req.body as {
                lessons: string[],

            };
            const reqSection = {
                lessons: lessons,
            }

            const newSection = await SectionsManager.createSection(reqSection);
            res.status(201)
                .json({ message: "Section created successfully", newSection });
        } catch (error) {
            console.error(error);
            next(error);
            res.status(500).json({ err: "Internal Server Error" });
        }
    }

    static async getById(
        req: Express.Request,
        res: Express.Response,
        next: NextFunction
    ) {
        try {
            const sectionId: string = req.params.id;
            console.log("sections controller", sectionId);
            const section = await SectionsManager.getSectionById(sectionId);
            if (!section) {
                return res.status(404).json({ message: "section not found" });
            }

            res.status(200).json({ section });
        } catch (error) {
            next(error);
        }
    }

    static async getLessonsById(
        req: Express.Request,
        res: Express.Response,
        next: NextFunction
    ) {
        try {
            const sectionId: string = req.params.id;
            console.log("controller: getLessonsById", sectionId);
            const lessons = await SectionsManager.getsLessonsByUnitId(sectionId);
            if (!lessons) {
                return res.status(404).json({ message: "lessons not found" });
            }

            res.status(200).json({ lessons });
        } catch (error) {
            console.error(error);
            next(error);
            res.status(500).json({ err: "Internal Server Error" });
        }
    }

    static async getMany(
        _req: Express.Request,
        res: Express.Response,
        next: NextFunction
    ) {
        try {
            const sections = await SectionsManager.getAllSections();
            console.log(sections);
            res.status(200).json({ sections });
        } catch (error) {
            console.error(error);
            next(error);
            res.status(500).json({ err: "Internal Server Error" });
        }
    }

    static async update(
        req: Express.Request,
        res: Express.Response,
        next: NextFunction
    ) {
        try {
            const sectionId: string = req.params.id;
            const fieldsToUpdate: Partial<SectionsType> = req.body;

            const updatedSection = await SectionsManager.updateSection(
                sectionId,
                fieldsToUpdate
            );

            if (!updatedSection) {
                return res.status(404).json({ message: "Section not found" });
            }

            res.status(200).json({ updatedSection });
        } catch (error) {
            console.error(error);
            next(error);
            res.status(500).json({ err: "Internal Server Error" });
        }
    }

    static async delete(
        req: Express.Request,
        res: Express.Response,
        next: NextFunction
    ) {
        try {
            const sectionId: string = req.params.id;
            const status = await SectionsManager.deleteSection(sectionId);

            if (!status) {
                return res.status(404).json({ message: "Section not found" });
            }

            res.status(200).json({ status });
        } catch (error) {
            console.error(error);
            next(error);
            res.status(500).json({ err: "Internal Server Error" });
        }
    }
}
