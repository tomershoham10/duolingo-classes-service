import { Router } from 'express';
import FsaRouter from './fsa/router.js';
import SpotreccRouter from './spotrecc/router.js';
import { asyncHandler } from '../middleware/errorHandling/asyncHandler.js';
import ExercisesController from './controller.js';

const ExercisesRouter = Router();

ExercisesRouter.get(
  '/getResultByUserAndExerciseId/:exerciseId/:userId',
  asyncHandler(ExercisesController.getResultByUserAndExerciseId)
)
  .get('/getExercisesByModelId/:modelId', asyncHandler(ExercisesController.getExercisesByModelId))
  .get('/:id', asyncHandler(ExercisesController.getById))
  .get('/', asyncHandler(ExercisesController.getMany));

ExercisesRouter.post('/', asyncHandler(ExercisesController.create));

ExercisesRouter.put('/:id', asyncHandler(ExercisesController.update));

ExercisesRouter.delete('/:id', asyncHandler(ExercisesController.delete));

ExercisesRouter.use('/fsa/', FsaRouter);
ExercisesRouter.use('/spotrecc/', SpotreccRouter);

export default ExercisesRouter;
