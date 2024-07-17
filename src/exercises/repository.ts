import TargetModel from '../targets/model.js';
import ResultsModel from '../results/model.js';
import ExerciseModel from './model.js';

export default class ExercisesRepository {
  static async createExercise(
    exercise: Partial<ExerciseType>
  ): Promise<ExerciseType> {
    try {
      console.log('exercises repo create: ', exercise);
      const newExercise = await ExerciseModel.create(exercise);
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
      const exercise = await ExerciseModel.findById(exerciseId);
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
      const exercise = await ExerciseModel.findById(exerciseId);
      console.log(
        'exercises repo getRelevantByExerciseId - exercise',
        exercise
      );
      if (exercise && exercise.type === ExercisesTypes.FSA) {
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
      const exercise = await ExerciseModel.findById(exerciseId);
      console.log('exercises repo getAnswersByExerciseId - exercise', exercise);
      if (exercise) {
        const answersIds = exercise.targetsList;
        if (exercise.type === ExercisesTypes.FSA) {
          if (answersIds) {
            const answersDetails = await TargetModel.find({
              _id: { $in: answersIds },
            });
            return answersDetails;
          } else return null;
        }
        if (exercise.type === ExercisesTypes.SPOTRECC) {
          const answersDetails = await TargetModel.find({
            _id: { $in: answersIds },
          });

          return answersDetails || exercise.notableFeatures || null;
        } else return null;
      } else return null;
    } catch (error: any) {
      console.error('Repository Error:', error.message);
      throw new Error(`exercises repo - getAnswersByExerciseId: ${error}`);
    }
  }

  static async getExerciseByTargetId(
    targetId: string
  ): Promise<ExerciseType[] | null> {
    try {
      const exercises = await ExerciseModel.find({ answers: targetId });
      console.log('exercises repo getExerciseByTargetId', exercises);
      return exercises;
    } catch (error: any) {
      console.error('Repository Error:', error.message);
      throw new Error(`exercises repo - getExerciseByTargetId: ${error}`);
    }
  }

  static async getExerciseById(
    exerciseId: string
  ): Promise<ExerciseType | null> {
    try {
      const exercise = await ExerciseModel.findById(exerciseId);
      console.log('exercises repo', exerciseId);
      return exercise;
    } catch (error) {
      throw new Error(`exercises repo getExerciseById: ${error}`);
    }
  }

  static async getAllExercises(): Promise<ExerciseType[]> {
    try {
      const exercises = await ExerciseModel.find({});
      return exercises;
    } catch (error) {
      throw new Error(`exercises repo getAllExercises: ${error}`);
    }
  }

  static async updateExercise(
    exerciseId: string,
    fieldsToUpdate: Partial<ExerciseType>
  ): Promise<ExerciseType | null> {
    try {
      const updatedExercise = await ExerciseModel.findByIdAndUpdate(
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

  static async deleteExercise(
    exerciseId: string
  ): Promise<ExerciseType | null> {
    try {
      const status = await ExerciseModel.findOneAndDelete({ _id: exerciseId });
      return status;
    } catch (error: any) {
      console.error('Repository Error:', error.message);
      throw new Error(`exercises repo - deleteExercise: ${error}`);
    }
  }
}
