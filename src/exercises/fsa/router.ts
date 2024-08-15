import { Router } from 'express';
import ExercisesController from './controller.js';
import { asyncHandler } from '../../middleware/errorHandling/asyncHandler.js';

const FsaRouter = Router();

FsaRouter.get(
  '/getRelevantByExerciseId/:exerciseId',
  asyncHandler(ExercisesController.getRelevantByExerciseId)
)
  .get(
    '/getAnswersByExerciseId/:exerciseId',
    asyncHandler(ExercisesController.getAnswersByExerciseId)
  )
  .get('/answers/:targetId', asyncHandler(ExercisesController.getByTargetId));

export default FsaRouter;
