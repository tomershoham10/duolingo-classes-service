import { getFromCache, resetNamespaceCache, setToCache } from "../utils/cache.js";
import SourcesRepository from "./repository.js";

export default class SourcesManager {
    static async createSource(source: Partial<SourceType>): Promise<SourceType> {
        try {
            const newSources = await SourcesRepository.createSource(source);
            await setToCache('sources', newSources._id, JSON.stringify(newSources), 3600);
            await resetNamespaceCache('getAllSources', 'allSources');

            return newSources
        }
        catch (error: any) {
            console.error('Manager Error [createSources]:', error.message);
            throw new Error('Error in unit creation process');
        }
    }

    static async getSourceById(sourceId: string): Promise<SourceType | null | undefined> {
        try {
            const cachedSource = await getFromCache('sources', sourceId);
            if (cachedSource) {
                console.log("Cache hit: sources manager - getSourceById", sourceId);
                return JSON.parse(cachedSource); // Parse cached JSON data
            }
            const source = await SourcesRepository.getSourceById(sourceId);
            source !== null ? await setToCache('sources', sourceId, JSON.stringify(source), 3600) : null;

            console.log("Sources manager getSourceById", source);
            return source;
        }
        catch (error: any) {
            console.error('Manager Error [getSourceById]:', error.message);
            throw new Error('Error in getSourceById');
        }
    }

    static async getAllSources(): Promise<SourceType[]> {
        try {
            const cachedSources = await getFromCache('getAllSources', 'allSources');
            if (cachedSources) {
                console.log("Cache hit: units manager - getAllSources", cachedSources);
                return JSON.parse(cachedSources); // Parse cached JSON data
            }
            const sources = await SourcesRepository.getAllSources();
            await setToCache('getAllSources', 'allSources', JSON.stringify(sources), 3600);

            return sources;
        }
        catch (error: any) {
            console.error('Manager Error [getAllSources]:', error.message);
            throw new Error('Error in getAllSources');
        }
    }

    static async updateSource(
        sourceId: string,
        filedsToUpdate: Partial<SourceType>
    ): Promise<SourceType | null | undefined> {
        try {
            const updatedSource = await SourcesRepository.updateSource(
                sourceId,
                filedsToUpdate
            );
            await setToCache('sources', sourceId, JSON.stringify(updatedSource), 3600);
            await resetNamespaceCache('getAllSources', 'allSources');

            return updatedSource;
        }
        catch (error: any) {
            console.error('Manager Error [updateSource]:', error.message);
            throw new Error('Error in updateSource');
        }
    }

    static async deleteSource(sourceId: string): Promise<SourceType | null | undefined> {
        try {
            const status = await SourcesRepository.deleteSource(sourceId);
            status ? await resetNamespaceCache('sources', sourceId) : null;
            await resetNamespaceCache('getAllSources', 'allSources');

            return status;
        }
        catch (error: any) {
            console.error('Manager Error [deleteSources]:', error.message);
            throw new Error('Error in deleteSources');
        }
    }
}
