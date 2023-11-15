import ResultsModel from "./model.js";

export default class ResultsRepository {
    static async createResult(result: Partial<ResultType>): Promise<ResultType> {
        try {
            console.log("Results repo create: ", result);
            const newResult = await ResultsModel.create(result);
            return newResult;
        }
        catch (error) {
            throw new Error(`Results repo create: ${error}`);
        }
    }

    static async getResultsByUserId(userId: string): Promise<ResultType[] | null> {
        try {
            const results = await ResultsModel.find({ userId: userId });
            console.log("results repo getResultsUserId", results);
            return results;
        }
        catch (error) {
            throw new Error(`results repo getResultsUserId: ${error}`);
        }
    }

    static async getResultById(resultsId: string): Promise<ResultType | null> {
        try {

            const result = await ResultsModel.findById(resultsId);
            console.log("results repo", resultsId);
            return result;
        }
        catch (error) {
            throw new Error(`fsa repo getExerciseById: ${error}`);
        }
    }

    static async getAllResults(): Promise<ResultType[]> {
        try {

            const results = await ResultsModel.find({});
            return results;
        }
        catch (error) {
            throw new Error(`results repo getAllResults: ${error}`);
        }
    }

    static async updateResult(
        resultsId: string,
        fieldsToUpdate: Partial<ResultType>
    ): Promise<ResultType | null> {
        try {

            const updatedResult = await ResultsModel.findByIdAndUpdate(
                resultsId,
                fieldsToUpdate,
                { new: true }
            );
            return updatedResult;
        }
        catch (error) {
            throw new Error(`Result repo updateResult: ${error}`);
        }
    }

    static async deleteResult(resultId: string): Promise<ResultType | null> {
        try {

            const status = await ResultsModel.findOneAndDelete({ _id: resultId });
            return status;
        }
        catch (error) {
            throw new Error(`results repo deleteResult: ${error}`);
        }
    }
}