import { Router } from 'express';
import { asyncHandler } from '../../middleware/errorHandling/asyncHandler.js';
import SpotreccController from './controller.js';

const SpotreccRouter = Router();

SpotreccRouter.get('/', asyncHandler(SpotreccController.check));

//   .get(
//     '/getRelevantByExerciseId/:exerciseId',
//     asyncHandler(SpotreccController.getRelevantByExerciseId)
//   )
//   .get(
//     '/getAnswersByExerciseId/:exerciseId',
//     asyncHandler(SpotreccController.getAnswersByExerciseId)
//   )
//   .get('/answers/:targetId', asyncHandler(SpotreccController.getByTargetId))
//   .get('/:id', asyncHandler(SpotreccController.getById))
//   .get('/', asyncHandler(SpotreccController.getMany));

SpotreccRouter.post('/', asyncHandler(SpotreccController.create));

// SpotreccRouter.put('/:id', asyncHandler(SpotreccController.update));

// SpotreccRouter.delete('/:id', asyncHandler(SpotreccController.delete));

export default SpotreccRouter;
