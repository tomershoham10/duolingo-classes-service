import FSAModel from "./model.js";

export default class FSARepository {
    static async createExercise(exercise: FSAType): Promise<FSAType> {
        const newExercise = await FSAModel.create(exercise);
        return newExercise;
    }

    static async getExerciseById(exerciseId: string): Promise<FSAType | null> {
        const exercise = await FSAModel.findById(exerciseId);
        console.log("FSA repo", exerciseId);
        return exercise;
    }

    static async getAllExercises(): Promise<FSAType[]> {
        const exercises = await FSAModel.find({});
        return exercises;
    }

    static async updateExercise(
        exerciseId: string,
        fieldsToUpdate: Partial<FSAType>
    ): Promise<FSAType | null> {
        const updatedExercise = await FSAModel.findByIdAndUpdate(
            exerciseId,
            fieldsToUpdate,
            { new: true }
        );
        return updatedExercise;
    }

    static async deleteExercise(exerciseId: string): Promise<FSAType | null> {
        const status = await FSAModel.findOneAndDelete({ _id: exerciseId });
        return status;
    }
}
