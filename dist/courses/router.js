import express from "express";
import CoursesController from "./controller.js";
import { asyncHandler } from "../middleware/errorHandling/asyncHandler.js";
const CoursesRouter = express.Router();
CoursesRouter
    .get("/getFirstLessonId/:courseId", asyncHandler(CoursesController.getFirstLessonId))
    .get("/getNextUnitId/:prevUnitId", asyncHandler(CoursesController.getNextUnitId))
    .get("/getUnitsById/:id", asyncHandler(CoursesController.getUnitsById))
    .get("/getUnsuspendedUnitsById/:id", asyncHandler(CoursesController.getUnsuspendedUnitsById))
    .get("/getByName/:courseName", asyncHandler(CoursesController.getByName))
    .get("/:id", asyncHandler(CoursesController.getById))
    .get("/", asyncHandler(CoursesController.getMany));
CoursesRouter.post("/", asyncHandler(CoursesController.create));
CoursesRouter
    .put("/suspendUnit/:courseId/:unitId", asyncHandler(CoursesController.suspendUnit))
    .put("/unsuspendUnit/:courseId/:unitId", asyncHandler(CoursesController.unsuspendUnit))
    .put("/:id", asyncHandler(CoursesController.update));
CoursesRouter.delete("/:id", asyncHandler(CoursesController.delete));
export default CoursesRouter;
//# sourceMappingURL=router.js.map