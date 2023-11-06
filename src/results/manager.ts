import ResultsRepository from "./repository.js";

export default class ResultsManager {
    static async createResult(
        result: Partial<ResultType>): Promise<ResultType> {
        try {
            const response = await ResultsRepository.createResult(result);
            return response
        }
        catch (error) {
            throw new Error(`Results repo create: ${error}`);
        }
    }

    static async getResultById(resultId: string): Promise<ResultType | null> {
        try {
            const results = await ResultsRepository.getResultById(resultId);
            console.log("results manager getResultById", results);
            return results;
        } catch (error) {
            throw new Error(`Results repo getResultById: ${error}`);
        }
    }

    static async getResultsByUserId(userId: string): Promise<ResultType[] | null> {
        try {

            const result = await ResultsRepository.getResultsByUserId(userId);
            console.log("results manager getResultsByUserId", result);
            return result;
        } catch (error) {
            throw new Error(`Results repo getResultsByUserId: ${error}`);
        }
    }

    static async getAllResults(): Promise<ResultType[]> {
        try {

            const results = await ResultsRepository.getAllResults();
            return results;
        } catch (error) {
            throw new Error(`Results repo getAllResults: ${error}`);
        }
    }

    static async updateResult(
        resultId: string,
        filedsToUpdate: Partial<ResultType>
    ): Promise<ResultType | null> {
        try {

            const updatedResult = await ResultsRepository.updateResult(
                resultId,
                filedsToUpdate
            );
            return updatedResult;
        } catch (error) {
            throw new Error(`Results repo updateResult: ${error}`);
        }
    }

    static async deleteResult(resultId: string): Promise<ResultType | null> {
        try {

            const status = await ResultsRepository.deleteResult(resultId);
            return status;
        } catch (error) {
            throw new Error(`Results repo deleteResult: ${error}`);
        }
    }
}
