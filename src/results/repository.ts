import ResultsModel from "./model.js";

export default class ResultsRepository {
    static async createResult(result: Partial<ResultType>): Promise<ResultType> {
        try {
            console.log("Results repo create: ", result, result);

            const isExerciseStarted = await ResultsRepository.getResultsByLessonAndUser(result.lessonId as string, result.userId as string);

            if (isExerciseStarted && isExerciseStarted.length > 0) {
                throw new Error(`exercise has already been started.`);
            }

            const newResult = await ResultsModel.create(result);
            return newResult;
        }
        catch (error) {
            throw new Error(`Results repo create: ${error}`);
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

    static async getResultsByLessonAndUser(lessonId: string, userId: string): Promise<ResultType[] | null> {
        try {
            const results = await ResultsModel.find({ lessonId: lessonId, userId: userId });
            console.log("results repo getResultsByLessonAndUser", results);
            return results;
        }
        catch (error) {
            throw new Error(`results repo getResultsByLessonAndUser: ${error}`);
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
