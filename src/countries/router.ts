import { Router } from 'express';
import CountryController from './controller.js';
import { asyncHandler } from '../middleware/errorHandling/asyncHandler.js';

const CountryRouter = Router();

CountryRouter.get('/:id', asyncHandler(CountryController.getById)).get(
  '/',
  asyncHandler(CountryController.getMany)
);

CountryRouter.post('/', asyncHandler(CountryController.create));

CountryRouter.put('/:id', asyncHandler(CountryController.update));

CountryRouter.delete('/:id', asyncHandler(CountryController.delete));

export default CountryRouter;
