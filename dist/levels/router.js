import express from "express";
import LevelsController from "./controller.js";
import { asyncHandler } from "../middleware/errorHandling/asyncHandler.js";
const LevelsRouter = express.Router();
LevelsRouter
    .get("/getNextLessonId/:prevLessonId", asyncHandler(LevelsController.getNextLessonId))
    .get("/getLessonsById/:id", asyncHandler(LevelsController.getLessonsById))
    .get("/:id", asyncHandler(LevelsController.getById))
    .get("/", asyncHandler(LevelsController.getMany));
LevelsRouter.post("/", asyncHandler(LevelsController.create));
LevelsRouter.put("/:id", asyncHandler(LevelsController.update));
LevelsRouter.delete("/:id", asyncHandler(LevelsController.delete));
export default LevelsRouter;
//# sourceMappingURL=router.js.map