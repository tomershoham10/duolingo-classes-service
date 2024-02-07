import express from "express";
import SourcesController from "./controller.js";
import { asyncHandler } from "../middleware/errorHandling/asyncHandler.js";

const SourcesRouter = express.Router();

SourcesRouter
    .get("/", asyncHandler(SourcesController.getMany));

SourcesRouter
    .post("/", asyncHandler(SourcesController.create));

SourcesRouter.put("/:id", asyncHandler(SourcesController.update));

SourcesRouter.delete("/:id", asyncHandler(SourcesController.delete));

export default SourcesRouter;
