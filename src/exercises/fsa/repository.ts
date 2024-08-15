import TargetModel from '../../targets/model.js';
import ResultsModel from '../../results/model.js';
import FsaModel from './model.js';

export default class ExercisesRepository {
  static async createExercise(exercise: Partial<FsaType>): Promise<FsaType> {
    try {
      console.log('exercises repo create: ', exercise);
      const newExercise = await FsaModel.create(exercise);
      return newExercise;
    } catch (error: any) {
      console.error('Repository Error:', error.message);
      throw new Error(`exercises repo - createExercise: ${error}`);
    }
  }

  static async getResultByUserAndExerciseId(
    exerciseId: string,
    userId: string
  ): Promise<ResultType | null> {
    try {
      const exercise = await FsaModel.findById(exerciseId);
      console.log(
        'exercises repo getResultByUserAndExerciseId - exercise',
        exercise
      );
      if (exercise && userId) {
        const result = await ResultsModel.findOne({
          exerciseId: { $eq: exerciseId },
          userId: { $eq: userId },
        });
        console.log(
          'exercises repo getResultByUserAndExerciseId - result',
          result
        );
        return result;
      } else return null;
    } catch (error: any) {
      console.error('Repository Error:', error.message);
      throw new Error(
        `exercises repo - getResultByUserAndExerciseId: ${error}`
      );
    }
  }

  static async getRelevantByExerciseId(
    exerciseId: string
  ): Promise<TargetType[] | null> {
    try {
      const exercise = await FsaModel.findById(exerciseId);
      console.log(
        'exercises repo getRelevantByExerciseId - exercise',
        exercise
      );
      if (exercise) {
        const relevantIds = exercise.relevant;
        if (relevantIds) {
          const targetsDetails = await TargetModel.find({
            _id: { $in: relevantIds },
            type: { $eq: 'vessel' },
          });
          console.log(
            'exercises repo getRelevantByExerciseId - targetsDetails',
            relevantIds,
            targetsDetails
          );
          return targetsDetails;
        } else return null;
      } else return null;
    } catch (error: any) {
      console.error('Repository Error:', error.message);
      throw new Error(`exercises repo - getRelevantByExerciseId: ${error}`);
    }
  }

  static async getAnswersByExerciseId(
    exerciseId: string
  ): Promise<TargetType[] | FeatureObject[] | null> {
    try {
      const exercise = await FsaModel.findById(exerciseId);
      console.log('exercises repo getAnswersByExerciseId - exercise', exercise);
      if (exercise) {
        const answersIds = exercise.targetsList;
        if (answersIds) {
          const answersDetails = await TargetModel.find({
            _id: { $in: answersIds },
          });
          return answersDetails;
        } else return null;
      } else return null;
    } catch (error: any) {
      console.error('Repository Error:', error.message);
      throw new Error(`exercises repo - getAnswersByExerciseId: ${error}`);
    }
  }

  static async getExerciseByTargetId(
    targetId: string
  ): Promise<FsaType[] | null> {
    try {
      const exercises = await FsaModel.find({ answers: targetId });
      console.log('exercises repo getExerciseByTargetId', exercises);
      return exercises;
    } catch (error: any) {
      console.error('Repository Error:', error.message);
      throw new Error(`exercises repo - getExerciseByTargetId: ${error}`);
    }
  }

  static async getExerciseById(exerciseId: string): Promise<FsaType | null> {
    try {
      const exercise = await FsaModel.findById(exerciseId);
      console.log('exercises repo', exerciseId);
      return exercise;
    } catch (error) {
      throw new Error(`exercises repo getExerciseById: ${error}`);
    }
  }

  static async getAllExercises(): Promise<FsaType[]> {
    try {
      const exercises = await FsaModel.find({});
      return exercises;
    } catch (error) {
      throw new Error(`exercises repo getAllExercises: ${error}`);
    }
  }

  static async updateExercise(
    exerciseId: string,
    fieldsToUpdate: Partial<FsaType>
  ): Promise<FsaType | null> {
    try {
      const updatedExercise = await FsaModel.findByIdAndUpdate(
        exerciseId,
        fieldsToUpdate,
        { new: true }
      );
      return updatedExercise;
    } catch (error: any) {
      console.error('Repository Error:', error.message);
      throw new Error(`exercises repo - updateExercise: ${error}`);
    }
  }

  static async deleteExercise(exerciseId: string): Promise<FsaType | null> {
    try {
      const status = await FsaModel.findOneAndDelete({ _id: exerciseId });
      return status;
    } catch (error: any) {
      console.error('Repository Error:', error.message);
      throw new Error(`exercises repo - deleteExercise: ${error}`);
    }
  }
}
