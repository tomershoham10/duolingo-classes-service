import { Router } from "express";
import ExercisesController from "./controller.js";
import { asyncHandler } from "../middleware/errorHandling/asyncHandler.js";


const ExercisesRouter = Router();

ExercisesRouter
    .get("/getResultByUserAndExerciseId/:exerciseId/:userId", asyncHandler(ExercisesController.getResultByUserAndExerciseId))
    .get("/getRelevantByExerciseId/:exerciseId", asyncHandler(ExercisesController.getRelevantByExerciseId))
    .get("/getAnswersByExerciseId/:exerciseId", asyncHandler(ExercisesController.getAnswersByExerciseId))
    .get("/answers/:targetId", asyncHandler(ExercisesController.getByTargetId))
    .get("/:id", asyncHandler(ExercisesController.getById))
    .get("/", asyncHandler(ExercisesController.getMany));


ExercisesRouter
    .post("/", asyncHandler(ExercisesController.create));

ExercisesRouter.put("/:id", asyncHandler(ExercisesController.update));

ExercisesRouter.delete("/:id", asyncHandler(ExercisesController.delete));

export default ExercisesRouter;
