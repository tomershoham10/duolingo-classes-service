import SpotreccModel from './model.js';

export default class SpotreccRepository {
  static async createExercise(exercise: Partial<ExerciseType>): Promise<any> {
    try {
      console.log('exercises repo create: ', exercise);
      const newExercise = await SpotreccModel.create(exercise);
      return newExercise;
    } catch (error: any) {
      console.error('Repository Error:', error.message);
      throw new Error(`exercises repo - createExercise: ${error}`);
    }
  }
}
