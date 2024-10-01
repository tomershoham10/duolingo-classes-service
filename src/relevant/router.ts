import { Router } from 'express';
import RelevantController from './controller.js';
import { asyncHandler } from '../middleware/errorHandling/asyncHandler.js';

const RelevantRouter = Router();

RelevantRouter.get('/:id', asyncHandler(RelevantController.getById)).get(
  '/',
  asyncHandler(RelevantController.getMany)
);

RelevantRouter.post('/', asyncHandler(RelevantController.create));

RelevantRouter.put('/:id', asyncHandler(RelevantController.update));

RelevantRouter.delete('/:id', asyncHandler(RelevantController.delete));

export default RelevantRouter;
