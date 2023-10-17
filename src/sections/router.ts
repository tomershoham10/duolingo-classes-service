import express from "express";
import SectionsController from "./controller.js";
import { asyncHandler } from "../middleware/errorHandling/asyncHandler.js";

const SectionsRouter = express.Router();

SectionsRouter.get("/", asyncHandler(SectionsController.getMany));

SectionsRouter.get("/:id", asyncHandler(SectionsController.getById));

SectionsRouter.post("/", asyncHandler(SectionsController.create));

SectionsRouter.put("/:id", asyncHandler(SectionsController.update));

SectionsRouter.delete("/:id", asyncHandler(SectionsController.delete));

export default SectionsRouter;
