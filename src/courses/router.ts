import express from "express";
import CoursesController from "./controller.js";

const CoursesRouter = express.Router();

CoursesRouter.get("/", CoursesController.getMany);

CoursesRouter.get("/:id", CoursesController.getById);

CoursesRouter.post("/", CoursesController.create);

CoursesRouter.put("/:id", CoursesController.update);

CoursesRouter.delete("/:id", CoursesController.delete);

export default CoursesRouter;
