import ResultsRepository from "./repository.js";
export default class ResultsManager {
    static async createResult(result) {
        try {
            const response = await ResultsRepository.createResult(result);
            return response;
        }
        catch (error) {
            throw new Error(`Results repo create: ${error}`);
        }
    }
    static async getResultById(resultId) {
        try {
            const results = await ResultsRepository.getResultById(resultId);
            console.log("results manager getResultById", results);
            return results;
        }
        catch (error) {
            throw new Error(`Results repo getResultById: ${error}`);
        }
    }
    static async getResultsByUserId(userId) {
        try {
            const result = await ResultsRepository.getResultsByUserId(userId);
            console.log("results manager getResultsByUserId", result);
            return result;
        }
        catch (error) {
            throw new Error(`Results repo getResultsByUserId: ${error}`);
        }
    }
    static async getAllResults() {
        try {
            const results = await ResultsRepository.getAllResults();
            return results;
        }
        catch (error) {
            throw new Error(`Results repo getAllResults: ${error}`);
        }
    }
    static async updateResult(resultId, filedsToUpdate) {
        try {
            const updatedResult = await ResultsRepository.updateResult(resultId, filedsToUpdate);
            return updatedResult;
        }
        catch (error) {
            throw new Error(`Results repo updateResult: ${error}`);
        }
    }
    static async deleteResult(resultId) {
        try {
            const status = await ResultsRepository.deleteResult(resultId);
            return status;
        }
        catch (error) {
            throw new Error(`Results repo deleteResult: ${error}`);
        }
    }
}
//# sourceMappingURL=manager.js.map