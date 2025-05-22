// import { Router } from 'express';
// import LessonsController from './controller.js';
// import { asyncHandler } from '../middleware/errorHandling/asyncHandler.js';

// const LessonsRouter = Router();

// LessonsRouter.get(
//   '/getResultsByLessonAndUser/:lessonId/results/:userId',
//   asyncHandler(LessonsController.getResultsByLessonAndUser)
// )
//   .get(
//     '/getExercisesById/:id',
//     asyncHandler(LessonsController.getExercisesById)
//   )
//   .get(
//     '/getUnsuspendedExercisesById/:id',
//     asyncHandler(LessonsController.getUnsuspendedExercisesById)
//   )
//   .get('/type/:type', asyncHandler(LessonsController.getById))
//   .get('/:id', asyncHandler(LessonsController.getById))
//   .get('/', asyncHandler(LessonsController.getMany));

// LessonsRouter.post(
//   '/createByLevel/:levelId',
//   asyncHandler(LessonsController.createByLevel)
// ).post('/', asyncHandler(LessonsController.create));

// LessonsRouter.put('/:id', asyncHandler(LessonsController.update));

// LessonsRouter.delete('/:id', asyncHandler(LessonsController.delete));

// export default LessonsRouter;
