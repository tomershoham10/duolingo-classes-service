import SourcesModel from "./model.js";
export default class SourcesRepository {
    static async createSource(Source) {
        try {
            const newSource = await SourcesModel.create(Source);
            return newSource;
        }
        catch (error) {
            if (error.name === 'ValidationError') {
                console.error('Repository Validation Error:', error.message);
                throw new Error('Validation error while creating Source');
            }
            else if (error.code === 11000) {
                console.error('Repository Duplicate Key Error:', error.message);
                throw new Error('Duplicate key error while creating Source');
            }
            else {
                console.error('Repository Error:', error.message);
                throw new Error('Error creating Source');
            }
        }
    }
    static async getSourceById(sourceId) {
        try {
            const Source = await SourcesModel.findById(sourceId);
            console.log("Sources repo getSourceById", sourceId);
            return Source;
        }
        catch (err) {
            throw new Error(`Error repo getSourceById: ${err}`);
        }
    }
    static async getAllSources() {
        try {
            const Sources = await SourcesModel.find({});
            return Sources;
        }
        catch (error) {
            console.error('Repository Error:', error.message);
            throw new Error(`Sources repo - getsLevelsBySourceId: ${error}`);
        }
    }
    static async updateSource(sourceId, fieldsToUpdate) {
        try {
            const updatedSource = await SourcesModel.findByIdAndUpdate(sourceId, fieldsToUpdate, { new: true });
            return updatedSource;
        }
        catch (error) {
            console.error('Repository Error:', error.message);
            throw new Error(`Sources repo - getsLevelsBySourceId: ${error}`);
        }
    }
    static async deleteSource(sourceId) {
        try {
            const status = await SourcesModel.findOneAndDelete({ _id: sourceId });
            return status;
        }
        catch (error) {
            console.error('Repository Error:', error.message);
            throw new Error(`Sources repo - getsLevelsBySourceId: ${error}`);
        }
    }
}
//# sourceMappingURL=repository.js.map