import { Router } from 'express';
import TargetsController from './controller.js';
import { asyncHandler } from '../middleware/errorHandling/asyncHandler.js';

const TargetsRouter = Router();

TargetsRouter
.get('/getTargetAncestors/:id',asyncHandler(TargetsController.getTargetAncestors))
  .get('/:id', asyncHandler(TargetsController.getById))
  .get('/', asyncHandler(TargetsController.getMany));

TargetsRouter.post('/', asyncHandler(TargetsController.create));

TargetsRouter.put('/:id', asyncHandler(TargetsController.update));

TargetsRouter.delete('/:id', asyncHandler(TargetsController.delete));

export default TargetsRouter;
