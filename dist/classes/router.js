import express from "express";
import ClassesController from "./controller.js";
import { asyncHandler } from "../middleware/errorHandling/asyncHandler.js";
const ClassesRouter = express.Router();
ClassesRouter.get("/", asyncHandler(ClassesController.getMany));
ClassesRouter.get("/:id", asyncHandler(ClassesController.getById));
ClassesRouter.post("/", asyncHandler(ClassesController.create));
ClassesRouter.put("/:id", asyncHandler(ClassesController.update));
ClassesRouter.delete("/:id", asyncHandler(ClassesController.delete));
export default ClassesRouter;
//# sourceMappingURL=router.js.map