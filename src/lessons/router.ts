import express from "express";
import LessonsController from "./controller.js";
import { asyncHandler } from "../middleware/errorHandling/asyncHandler.js";

const LessonsRouter = express.Router();

LessonsRouter.get("/", asyncHandler(LessonsController.getMany));

LessonsRouter.get("/:id", asyncHandler(LessonsController.getById));

LessonsRouter.get("/:type", asyncHandler(LessonsController.getById));

LessonsRouter.post("/", asyncHandler(LessonsController.create));

LessonsRouter.put("/:id", asyncHandler(LessonsController.update));

LessonsRouter.delete("/:id", asyncHandler(LessonsController.delete));

export default LessonsRouter;
