import SourcesRepository from "./repository.js";
export default class SourcesManager {
    static async createSource(source) {
        try {
            const newSources = await SourcesRepository.createSource(source);
            return newSources;
        }
        catch (error) {
            console.error('Manager Error [createSources]:', error.message);
            throw new Error('Error in unit creation process');
        }
    }
    static async getSourceById(sourceId) {
        try {
            const source = await SourcesRepository.getSourceById(sourceId);
            console.log("Sources manager getSourceById", source);
            return source;
        }
        catch (error) {
            console.error('Manager Error [getSourceById]:', error.message);
            throw new Error('Error in getSourceById');
        }
    }
    static async getAllSources() {
        try {
            const sources = await SourcesRepository.getAllSources();
            return sources;
        }
        catch (error) {
            console.error('Manager Error [getAllSources]:', error.message);
            throw new Error('Error in getAllSources');
        }
    }
    static async updateSource(sourceId, filedsToUpdate) {
        const updatedSource = await SourcesRepository.updateSource(sourceId, filedsToUpdate);
        try {
            return updatedSource;
        }
        catch (error) {
            console.error('Manager Error [updateSource]:', error.message);
            throw new Error('Error in updateSource');
        }
    }
    static async deleteSource(sourceId) {
        try {
            const status = await SourcesRepository.deleteSource(sourceId);
            return status;
        }
        catch (error) {
            console.error('Manager Error [deleteSources]:', error.message);
            throw new Error('Error in deleteSources');
        }
    }
}
//# sourceMappingURL=manager.js.map