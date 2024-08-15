import TargetModel from '../../targets/model.js';
import FsaModel from './model.js';

export default class FsaRepository {
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
}
