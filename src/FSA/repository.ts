import FSAModel from "./model.js";

export default class FSARepository {
    static async createExercise(exercise: Partial<FSAType>): Promise<FSAType> {
        try {
            console.log("fsa repo create: ", exercise);
            const newExercise = await FSAModel.create(exercise);
            return newExercise;
        }
        catch (error) {
            throw new Error(`fsa repo create: ${error}`);
        }
    }

    static async getExerciseByAnswerId(answerId: string): Promise<FSAType[] | null> {
        try {
            const exercises = await FSAModel.find({ answers: answerId });
            console.log("FSA repo getExerciseByAnswerId", exercises);
            return exercises;
        }
        catch (error) {
            throw new Error(`fsa repo getExerciseByAnswerId: ${error}`);
        }
    }

    static async getExerciseById(exerciseId: string): Promise<FSAType | null> {
        try {

            const exercise = await FSAModel.findById(exerciseId);
            console.log("FSA repo", exerciseId);
            return exercise;
        }
        catch (error) {
            throw new Error(`fsa repo getExerciseById: ${error}`);
        }
    }

    static async getAllExercises(): Promise<FSAType[]> {
        try {

            const exercises = await FSAModel.find({});
            return exercises;
        }
        catch (error) {
            throw new Error(`fsa repo getAllExercises: ${error}`);
        }
    }

    static async updateExercise(
        exerciseId: string,
        fieldsToUpdate: Partial<FSAType>
    ): Promise<FSAType | null> {
        try {

            const updatedExercise = await FSAModel.findByIdAndUpdate(
                exerciseId,
                fieldsToUpdate,
                { new: true }
            );
            return updatedExercise;
        }
        catch (error) {
            throw new Error(`fsa repo updateExercise: ${error}`);
        }
    }

    static async deleteExercise(exerciseId: string): Promise<FSAType | null> {
        try {

            const status = await FSAModel.findOneAndDelete({ _id: exerciseId });
            return status;
        }
        catch (error) {
            throw new Error(`fsa repo deleteExercise: ${error}`);
        }
    }
}
