import express from "express";
import CoursesController from "./controller.js";
import { asyncHandler } from "../middleware/errorHandling/asyncHandler.js";


const CoursesRouter = express.Router();

CoursesRouter.get("/", asyncHandler(CoursesController.getMany));

CoursesRouter.get("/:id", asyncHandler(CoursesController.getById));

CoursesRouter.post("/", asyncHandler(CoursesController.create));

CoursesRouter.put("/:id", asyncHandler(CoursesController.update));

CoursesRouter.delete("/:id", asyncHandler(CoursesController.delete));

export default CoursesRouter;
