import { Router } from 'express';
import UnitsController from './controller.js';
import { asyncHandler } from '../middleware/errorHandling/asyncHandler.js';

const UnitsRouter = Router();

UnitsRouter.get(
  '/getNextLevelId/:prevLevelId',
  asyncHandler(UnitsController.getNextLevelId)
)
  .get('/getLevelsById/:id', asyncHandler(UnitsController.getLevelsById))
  .get(
    '/getUnsuspendedLevelsById/:id',
    asyncHandler(UnitsController.getUnsuspendedLevelsById)
  )
  .get('/:id', asyncHandler(UnitsController.getById))
  .get('/', asyncHandler(UnitsController.getMany));

UnitsRouter.post(
  '/createByCourse',
  asyncHandler(UnitsController.createByCourse)
).post('/', asyncHandler(UnitsController.create));

UnitsRouter.put(
  '/suspendLevel/:unitId/:levelId',
  asyncHandler(UnitsController.suspendLevel)
)
  .put(
    '/unsuspendLevel/:unitId/:levelId',
    asyncHandler(UnitsController.unsuspendLevel)
  )
  .put('/:createNewLevel/:id', asyncHandler(UnitsController.createNewLevel))
  .put('/:id', asyncHandler(UnitsController.update));

UnitsRouter.delete('/:id', asyncHandler(UnitsController.delete));

export default UnitsRouter;
