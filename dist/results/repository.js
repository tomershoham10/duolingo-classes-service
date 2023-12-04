import ResultsModel from "./model.js";
export default class ResultsRepository {
    static async createResult(result) {
        try {
            console.log("Results repo create: ", result);
            const startedResults = await ResultsRepository.getResultsByLessonAndUser(result.lessonId, result.userId);
            if (startedResults) {
                const exercisesIds = startedResults.map(result => result.exerciseId);
                if (result.exerciseId && exercisesIds.includes(result.exerciseId)) {
                    throw new Error(`exercise has already been started.`);
                }
            }
            const newResult = await ResultsModel.create(result);
            return newResult;
        }
        catch (error) {
            throw new Error(`Results repo create: ${error}`);
        }
    }
    static async getResultById(resultsId) {
        try {
            const result = await ResultsModel.findById(resultsId);
            console.log("results repo", resultsId);
            return result;
        }
        catch (error) {
            throw new Error(`fsa repo getExerciseById: ${error}`);
        }
    }
    static async getResultsByUserId(userId) {
        try {
            const results = await ResultsModel.find({ userId: userId });
            console.log("results repo getResultsUserId", results);
            return results;
        }
        catch (error) {
            throw new Error(`results repo getResultsUserId: ${error}`);
        }
    }
    static async getResultsByLessonAndUser(lessonId, userId) {
        try {
            const results = await ResultsModel.find({ lessonId: lessonId, userId: userId });
            console.log("results repo getResultsByLessonAndUser", results);
            return results;
        }
        catch (error) {
            throw new Error(`results repo getResultsByLessonAndUser: ${error}`);
        }
    }
    static async getAllResults() {
        try {
            const results = await ResultsModel.find({});
            return results;
        }
        catch (error) {
            throw new Error(`results repo getAllResults: ${error}`);
        }
    }
    static async updateResult(resultsId, fieldsToUpdate) {
        try {
            const updatedResult = await ResultsModel.findByIdAndUpdate(resultsId, fieldsToUpdate, { new: true });
            return updatedResult;
        }
        catch (error) {
            throw new Error(`Result repo updateResult: ${error}`);
        }
    }
    static async deleteResult(resultId) {
        try {
            const status = await ResultsModel.findOneAndDelete({ _id: resultId });
            return status;
        }
        catch (error) {
            throw new Error(`results repo deleteResult: ${error}`);
        }
    }
}
//# sourceMappingURL=repository.js.map