import express from "express";
import ResultsController from "./controller.js";
import { asyncHandler } from "../middleware/errorHandling/asyncHandler.js";
const ResultsRouter = express.Router();
ResultsRouter
    .get("/getResultsByLessonAndUser/:lessonId/:userId", asyncHandler(ResultsController.getResultsByLessonAndUser))
    .get("/getResultsByUserId/:userId", asyncHandler(ResultsController.getResultsByUserId))
    .get("/:id", asyncHandler(ResultsController.getById))
    .get("/", asyncHandler(ResultsController.getMany));
ResultsRouter.post("/", asyncHandler(ResultsController.create));
ResultsRouter
    .put("/submitExercise/:id", asyncHandler(ResultsController.submitExercise))
    .put("/:id", asyncHandler(ResultsController.update));
ResultsRouter.delete("/:id", asyncHandler(ResultsController.delete));
export default ResultsRouter;
//# sourceMappingURL=router.js.map