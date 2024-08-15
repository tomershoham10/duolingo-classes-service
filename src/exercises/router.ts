import { Router } from 'express';
import FsaRouter from './fsa/router.js';
import SpotreccRouter from './spotrecc/router.js';

const ExercisesRouter = Router();

ExercisesRouter.use('/fsa/', FsaRouter);
ExercisesRouter.use('/spotrecc/', SpotreccRouter);

export default ExercisesRouter;
