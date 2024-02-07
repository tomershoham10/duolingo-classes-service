import SourcesRepository from "./repository.js";

export default class SourcesManager {
    static async createSource(source: Partial<SourceType>): Promise<SourceType> {
        try {
            const newSources = await SourcesRepository.createSource(source);
            return newSources
        }
        catch (error: any) {
            console.error('Manager Error [createSources]:', error.message);
            throw new Error('Error in unit creation process');
        }
    }

    static async getSourceById(sourceId: string): Promise<SourceType | null | undefined> {
        try {
            const source = await SourcesRepository.getSourceById(sourceId);
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
            const sources = await SourcesRepository.getAllSources();
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
        const updatedSource = await SourcesRepository.updateSource(
            sourceId,
            filedsToUpdate
        );
        try {
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
            return status;
        }
        catch (error: any) {
            console.error('Manager Error [deleteSources]:', error.message);
            throw new Error('Error in deleteSources');
        }
    }
}
