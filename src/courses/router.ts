import express from "express";
import CoursesController from "./controller.js";
import { asyncHandler } from "../middleware/errorHandling/asyncHandler.js";


const CoursesRouter = express.Router();

CoursesRouter
    .get("/getNextUnitId/:pervUnitId", asyncHandler(CoursesController.getNextUnitId))
    .get("/getUnitsById/:id", asyncHandler(CoursesController.getUnitsById))
    .get("/getByName/:courseName", asyncHandler(CoursesController.getByName))
    .get("/:id", asyncHandler(CoursesController.getById))
    .get("/", asyncHandler(CoursesController.getMany));

CoursesRouter.post("/", asyncHandler(CoursesController.create));

CoursesRouter.put("/:id", asyncHandler(CoursesController.update));

CoursesRouter.delete("/:id", asyncHandler(CoursesController.delete));

export default CoursesRouter;
