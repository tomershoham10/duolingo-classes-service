// import {
//   getFromCache,
//   resetNamespaceCache,
//   setToCache,
// } from '../utils/cache.js';
// import LessonsRepository from './repository.js';

// export default class LessonsManager {
//   static async createLesson(
//     lesson: Partial<LessonsType>
//   ): Promise<LessonsType> {
//     try {
//       const response = await LessonsRepository.createLesson(lesson);
//       await setToCache('lessons', response._id, JSON.stringify(response), 3600);
//       await resetNamespaceCache('getAllLessons', 'allLessons');
//       return response;
//     } catch (error: any) {
//       console.error('Manager Error [createLesson]:', error.message);
//       throw new Error('Error in createLesson');
//     }
//   }

//   static async getLessonById(lessonId: string): Promise<LessonsType | null> {
//     try {
//       const cachedLesson = await getFromCache('lessons', lessonId);
//       if (cachedLesson) {
//         console.log('Cache hit: lessons manager - getLessonById', lessonId);
//         return JSON.parse(cachedLesson); // Parse cached JSON data
//       }

//       const lesson = await LessonsRepository.getLessonById(lessonId);
//       lesson !== null
//         ? await setToCache('lessons', lessonId, JSON.stringify(lesson), 3600)
//         : null;

//       console.log('Lessons manager', lesson);
//       return lesson;
//     } catch (error: any) {
//       console.error('Manager Error [getLessonById]:', error.message);
//       throw new Error('Error in getLessonById');
//     }
//   }

//   static async getsExercisesByLessonId(
//     lessonId: string
//   ): Promise<(FsaType | SpotreccType)[]> {
//     try {
//       const cachedExercises = await getFromCache(
//         'getsExercisesByLessonId',
//         lessonId
//       );
//       if (cachedExercises) {
//         console.log(
//           'Cache hit: lessons manager - getsExercisesByLessonId',
//           lessonId
//         );
//         return JSON.parse(cachedExercises); // Parse cached JSON data
//       }

//       const exercises =
//         await LessonsRepository.getsExercisesByLessonId(lessonId);
//       await setToCache(
//         'getsExercisesByLessonId',
//         lessonId,
//         JSON.stringify(exercises),
//         3600
//       );
//       console.log('lesson manager getsExercisesByLessonId', exercises);
//       return exercises;
//     } catch (error: any) {
//       console.error('Manager Error [getsExercisesByLessonId]:', error.message);
//       throw new Error('Error in getsExercisesByLessonId');
//     }
//   }

//   static async getsUnsuspendedExercisesByLessonId(
//     lessonId: string
//   ): Promise<ExerciseType[]> {
//     try {
//       const cachedExercises = await getFromCache(
//         'getsUnsuspendedExercisesByLessonId',
//         lessonId
//       );
//       if (cachedExercises) {
//         console.log(
//           'Cache hit: lessons manager - getsUnsuspendedExercisesByLessonId',
//           lessonId
//         );
//         return JSON.parse(cachedExercises); // Parse cached JSON data
//       }

//       const exercises =
//         await LessonsRepository.getsUnsuspendedExercisesByLessonId(lessonId);
//       await setToCache(
//         'getsUnsuspendedExercisesByLessonId',
//         lessonId,
//         JSON.stringify(exercises),
//         3600
//       );
//       console.log(
//         'lesson manager getsUnsuspendedExercisesByLessonId',
//         exercises
//       );
//       return exercises;
//     } catch (error: any) {
//       console.error(
//         'Manager Error [getsUnsuspendedExercisesByLessonId]:',
//         error.message
//       );
//       throw new Error('Error in getsUnsuspendedExercisesByLessonId');
//     }
//   }

//   static async getResultsByLessonIdAndUserId(
//     lessonId: string,
//     userId: string
//   ): Promise<
//     { numOfExercises: number; results: ResultType[] } | null | undefined
//   > {
//     try {
//       const cachedResults = await getFromCache(
//         'getResultsByLessonIdAndUserId',
//         lessonId + userId
//       );
//       if (cachedResults) {
//         console.log(
//           'Cache hit: lessons manager - getResultsByLessonIdAndUserId',
//           lessonId + userId
//         );
//         return JSON.parse(cachedResults); // Parse cached JSON data
//       }
//       const results = await LessonsRepository.getResultsByLessonIdAndUserId(
//         lessonId,
//         userId
//       );
//       await setToCache(
//         'getResultsByLessonIdAndUserId',
//         lessonId + userId,
//         JSON.stringify(results),
//         3600
//       );
//       console.log('lesson manager getsResultsByLessonId', results);
//       return results;
//     } catch (error: any) {
//       console.error(
//         'Manager Error [getResultsByLessonIdAndUserId]:',
//         error.message
//       );
//       throw new Error('Error in getResultsByLessonIdAndUserId');
//     }
//   }

//   static async getAllLessons(): Promise<LessonsType[]> {
//     try {
//       const cachedLessons = await getFromCache('getAllLessons', 'allLessons');
//       if (cachedLessons) {
//         console.log('Cache hit: units manager - getAllUnits', cachedLessons);
//         return JSON.parse(cachedLessons); // Parse cached JSON data
//       }

//       const lessons = await LessonsRepository.getAllLessons();

//       await setToCache(
//         'getAllLessons',
//         'allLessons',
//         JSON.stringify(lessons),
//         3600
//       );

//       return lessons;
//     } catch (error: any) {
//       console.error('Manager Error [getAllLessons]:', error.message);
//       throw new Error('Error in getAllLessons');
//     }
//   }

//   static async updateLesson(
//     lessonId: string,
//     filedsToUpdate: Partial<LessonsType>
//   ): Promise<LessonsType | null> {
//     try {
//       const updatedLesson = await LessonsRepository.updateLesson(
//         lessonId,
//         filedsToUpdate
//       );
//       await setToCache(
//         'lessons',
//         lessonId,
//         JSON.stringify(updatedLesson),
//         3600
//       );
//       await resetNamespaceCache('getAllLessons', 'allLessons');

//       return updatedLesson;
//     } catch (error: any) {
//       console.error('Manager Error [updateLesson]:', error.message);
//       throw new Error('Error in updateLesson');
//     }
//   }

//   static async deleteLesson(lessonId: string): Promise<LessonsType | null> {
//     try {
//       const status = await LessonsRepository.deleteLesson(lessonId);
//       status ? await resetNamespaceCache('lessons', lessonId) : null;
//       await resetNamespaceCache('getAllLessons', 'allLessons');

//       return status;
//     } catch (error: any) {
//       console.error('Manager Error [deleteLesson]:', error.message);
//       throw new Error('Error in deleteLesson');
//     }
//   }
// }
