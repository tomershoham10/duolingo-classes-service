// import ExerciseModel from '../exercises/fsa/model.js';
// import ResultsModel from '../results/model.js';
// import LessonsModel from './model.js';

// export default class LessonsRepository {
//   static async createLesson(
//     lesson: Partial<LessonsType>
//   ): Promise<LessonsType> {
//     try {
//       const newLesson = await LessonsModel.create(lesson);
//       return newLesson;
//     } catch (error: any) {
//       console.error('Repository Error:', error.message);
//       throw new Error(`lesson repo - getsExercisesByLessonId: ${error}`);
//     }
//   }

//   static async getLessonById(lessonId: string): Promise<LessonsType | null> {
//     try {
//       const lesson = await LessonsModel.findById(lessonId);
//       console.log('lessons repo', lessonId);
//       return lesson;
//     } catch (error: any) {
//       console.error('Repository Error:', error.message);
//       throw new Error(`lesson repo - getLessonById: ${error}`);
//     }
//   }

//   static async getsExercisesByLessonId(
//     lessonId: string
//   ): Promise<(FsaType | SpotreccType)[]> {
//     try {
//       const lesson = await LessonsModel.findById(lessonId);
//       console.log('repo - getsExercisesByLessonId - lesson', lesson);
//       if (lesson) {
//         const exercisesIds = lesson.exercisesIds;
//         console.log(
//           'repo - getsExercisesByLessonId - exercisesIds',
//           exercisesIds
//         );

//         if (exercisesIds) {
//           const exercisesDetails = await LessonsModel.aggregate([
//             {
//               $match: {
//                 _id: lesson._id,
//               },
//             },
//             {
//               $lookup: {
//                 from: 'exercises',
//                 let: { exercisesIds: '$exercisesIds' },
//                 pipeline: [
//                   {
//                     $match: {
//                       $expr: {
//                         $in: [
//                           '$_id',
//                           {
//                             $map: {
//                               input: '$$exercisesIds',
//                               as: 'id',
//                               in: { $toObjectId: '$$id' },
//                             },
//                           },
//                         ],
//                       },
//                     },
//                   },
//                 ],
//                 as: 'exercises',
//               },
//             },
//           ]);

//           console.log(
//             'repo - getsExercisesByLessonId - exercisesDetails',
//             exercisesIds,
//             exercisesDetails
//           );
//           return exercisesDetails as (FsaType | SpotreccType)[];
//         } else return [];
//       } else return [];
//     } catch (error: any) {
//       console.error('Repository Error:', error.message);
//       throw new Error(`lesson repo - getsExercisesByLessonId: ${error}`);
//     }
//   }

//   static async getsUnsuspendedExercisesByLessonId(
//     lessonId: string
//   ): Promise<ExerciseType[]> {
//     try {
//       const lesson = await LessonsModel.findById(lessonId);
//       if (lesson) {
//         const exercisesIds = lesson.exercisesIds;
//         console.log(
//           'repo - getsUnsuspendedExercisesByLessonId: exercisesIds',
//           exercisesIds
//         );
//         const unSuspendExercisesIds = exercisesIds.filter(
//           (lessonId) => !lesson.suspendedExercisesIds.includes(lessonId)
//         );
//         console.log(
//           'repo - getsUnsuspendedExercisesByLessonId: unSuspendExercisesIds',
//           lesson.suspendedExercisesIds,
//           unSuspendExercisesIds
//         );
//         if (unSuspendExercisesIds.length > 0) {
//           const exerciseDetails = await ExerciseModel.find({
//             _id: { $in: unSuspendExercisesIds },
//           });
//           console.log(
//             'repo - getsUnsuspendedExercisesByLessonId: exerciseDetails',
//             exerciseDetails
//           );
//           return exerciseDetails as ExerciseType[];
//         } else return [];
//       } else return [];
//     } catch (error: any) {
//       console.error('Repository Error:', error.message);
//       throw new Error(`lesson repo - getsExercisesByLessonId: ${error}`);
//     }
//   }

//   static async getResultsByLessonIdAndUserId(
//     lessonId: string,
//     userId: string
//   ): Promise<{ numOfExercises: number; results: ResultType[] } | null> {
//     try {
//       console.log(
//         'lessons repo getsExercisesByUnitId',
//         'lessonId',
//         lessonId,
//         'userId',
//         userId
//       );

//       const lesson = await LessonsModel.findById(lessonId);
//       if (lesson) {
//         const exercisesIds = lesson.exercisesIds;

//         if (exercisesIds) {
//           // const exerciseDetails: ExerciseType[] = await ExerciseModel.find({ _id: { $in: exercisesIds } });
//           console.log(' lessons repo - exercisesIds', exercisesIds);

//           // const exercisesIdInOrder = exerciseDetails.map((FSA) => { if (FSA !== undefined) { FSA.id } });

//           const resResults: ResultType[] = await ResultsModel.find({
//             exerciseId: { $in: exercisesIds },
//             userId: userId,
//           });
//           const exercisesInOrder = resResults.sort((a, b) => {
//             const aIndex = exercisesIds.indexOf(a._id);
//             const bIndex = exercisesIds.indexOf(b._id);
//             return aIndex - bIndex;
//           });
//           console.log(' lessons repo - results', {
//             numOfExercises: exercisesIds.length,
//             results: exercisesInOrder,
//           });
//           const results = {
//             numOfExercises: exercisesIds.length,
//             results: exercisesInOrder,
//           };
//           return results as { numOfExercises: number; results: ResultType[] };
//         } else return null;
//       } else return null;
//     } catch (error: any) {
//       console.error('Repository Error:', error.message);
//       throw new Error(`lesson repo - getResultsByLessonIdAndUserId: ${error}`);
//     }
//   }

//   static async getAllLessons(): Promise<LessonsType[]> {
//     try {
//       const lessons = await LessonsModel.find({});
//       return lessons;
//     } catch (error: any) {
//       console.error('Repository Error:', error.message);
//       throw new Error(`lesson repo - getAllLessons: ${error}`);
//     }
//   }

//   static async updateLesson(
//     lessonId: string,
//     fieldsToUpdate: Partial<LessonsType>
//   ): Promise<LessonsType | null> {
//     try {
//       const updatedLesson = await LessonsModel.findByIdAndUpdate(
//         lessonId,
//         fieldsToUpdate,
//         { new: true }
//       );
//       return updatedLesson;
//     } catch (error: any) {
//       console.error('Repository Error:', error.message);
//       throw new Error(`lesson repo - updateLesson: ${error}`);
//     }
//   }

//   static async deleteLesson(lessonId: string): Promise<LessonsType | null> {
//     try {
//       const status = await LessonsModel.findOneAndDelete({ _id: lessonId });
//       return status;
//     } catch (error: any) {
//       console.error('Repository Error:', error.message);
//       throw new Error(`lesson repo - deleteLesson: ${error}`);
//     }
//   }
// }
