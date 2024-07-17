import { Router } from 'express';
import OptionController from './controller.js';
import { asyncHandler } from '../middleware/errorHandling/asyncHandler.js';

const OptionRouter = Router();

OptionRouter.get('/:id', asyncHandler(OptionController.getById)).get(
  '/',
  asyncHandler(OptionController.getMany)
);

OptionRouter.post('/', asyncHandler(OptionController.create));

OptionRouter.put('/:id', asyncHandler(OptionController.update));

OptionRouter.delete('/:id', asyncHandler(OptionController.delete));

export default OptionRouter;
