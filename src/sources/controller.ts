import { Request, Response } from "express";
import SourcesManager from "./manager.js";

export default class SourcesController {
    static async create(req: Request, res: Response) {
        try {
            const sourceName = req.body.name as string;


            const reqSource: Partial<SourceType> = { name: sourceName };

            const newSource = await SourcesManager.createSource(reqSource);
            if (!!newSource) {
                return res.status(201).json({ message: "Source created successfully", newSource });
            } else {
                throw new Error('Source controller create error.');
            }
        } catch (error: any) {
            console.error('Controller Error:', error.message);
            res.status(400).json({ error: error.message });
        }
    }

    static async getById(req: Request, res: Response) {
        try {
            const sourceId: string = req.params.id;
            console.log("sources controller sourceId", sourceId);
            const source = await SourcesManager.getSourceById(sourceId);
            if (!source) {
                return res.status(404).json({ message: "source not found" });
            }

            res.status(200).json({ source });
        } catch (error: any) {
            console.error('Controller Error:', error.message);
            res.status(500).json({ error: error.message });
        }
    }

    static async getMany(_req: Request, res: Response) {
        try {
            const sources = await SourcesManager.getAllSources();
            console.log(sources);
            res.status(200).json({ sources });
        } catch (error: any) {
            console.error('Controller Error:', error.message);
            res.status(500).json({ error: error.message });
        }
    }

    static async update(req: Request, res: Response) {
        try {
            const sourceId: string = req.params.id;
            const fieldsToUpdate: Partial<SourceType> = req.body;

            const updatedSource = await SourcesManager.updateSource(
                sourceId,
                fieldsToUpdate
            );

            if (!updatedSource) {
                return res.status(404).json({ message: "source not found" });
            }

            res.status(200).json({ updatedSource });
        } catch (error: any) {
            console.error('Controller Error:', error.message);
            res.status(500).json({ error: error.message });
        }
    }

    static async delete(req: Request, res: Response) {
        try {
            const sourceId: string = req.params.id;
            const status = await SourcesManager.deleteSource(sourceId);

            if (!status) {
                return res.status(404).json({ message: "source not found" });
            }

            res.status(200).json({ status });
        } catch (error: any) {
            console.error('Controller Error:', error.message);
            res.status(500).json({ error: error.message });
        }
    }
}
