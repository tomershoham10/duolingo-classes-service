import { Router } from 'express';
import ExercisesController from './controller.js';
import { asyncHandler } from '../../middleware/errorHandling/asyncHandler.js';

const FsaRouter = Router();

FsaRouter
  // .get(
  //   '/getResultByUserAndExerciseId/:exerciseId/:userId',
  //   asyncHandler(ExercisesController.getResultByUserAndExerciseId)
  // )
  .get(
    '/getRelevantByExerciseId/:exerciseId',
    asyncHandler(ExercisesController.getRelevantByExerciseId)
  )
  .get(
    '/getAnswersByExerciseId/:exerciseId',
    asyncHandler(ExercisesController.getAnswersByExerciseId)
  )
  .get('/answers/:targetId', asyncHandler(ExercisesController.getByTargetId))
  .get('/:id', asyncHandler(ExercisesController.getById))
  .get('/', asyncHandler(ExercisesController.getMany));

FsaRouter.post('/', asyncHandler(ExercisesController.create));

FsaRouter.put('/:id', asyncHandler(ExercisesController.update));

FsaRouter.delete('/:id', asyncHandler(ExercisesController.delete));

export default FsaRouter;
