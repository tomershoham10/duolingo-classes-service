import { Router } from 'express';
import LevelsController from './controller.js';
import { asyncHandler } from '../middleware/errorHandling/asyncHandler.js';

const LevelsRouter = Router();

LevelsRouter.get(
  '/getNextExerciseId/:prevExerciseId',
  asyncHandler(LevelsController.getNextExerciseId)
)
  .get('/getExercisesById/:id', asyncHandler(LevelsController.getExercisesById))
  .get(
    '/getsUnsuspendedExercisesById/:id',
    asyncHandler(LevelsController.getsUnsuspendedExercisesById)
  )
  .get('/:id', asyncHandler(LevelsController.getById))
  .get('/', asyncHandler(LevelsController.getMany));

LevelsRouter.post(
  '/createByCourse/:courseId',
  asyncHandler(LevelsController.createByCourse)
).post('/', asyncHandler(LevelsController.create));

LevelsRouter.put(
  '/suspendExercise/:levelId/:exerciseId',
  asyncHandler(LevelsController.suspendExercise)
)
  .put(
    '/unsuspendExercise/:levelId/:exerciseId',
    asyncHandler(LevelsController.unsuspendExercise)
  )
  .put('/:id', asyncHandler(LevelsController.update));

LevelsRouter.delete('/:id', asyncHandler(LevelsController.delete));

export default LevelsRouter;
