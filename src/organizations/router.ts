import { Router } from 'express';
import OrganizationController from './controller.js';
import { asyncHandler } from '../middleware/errorHandling/asyncHandler.js';

const OrganizationRouter = Router();

OrganizationRouter.get('/:id', asyncHandler(OrganizationController.getById)).get(
  '/',
  asyncHandler(OrganizationController.getMany)
);

OrganizationRouter.post('/', asyncHandler(OrganizationController.create));

OrganizationRouter.put('/:id', asyncHandler(OrganizationController.update));

OrganizationRouter.delete('/:id', asyncHandler(OrganizationController.delete));

export default OrganizationRouter;
