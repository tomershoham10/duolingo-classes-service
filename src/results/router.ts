import express from "express";
import ResultsController from "./controller.js";
import { asyncHandler } from "../middleware/errorHandling/asyncHandler.js";


const ResultsRouter = express.Router();

ResultsRouter
    .get("/getResultsByUserId/:userId", asyncHandler(ResultsController.getResultsByUserId))
    .get("/:id", asyncHandler(ResultsController.getById))
    .get("/", asyncHandler(ResultsController.getMany));

ResultsRouter.post("/", asyncHandler(ResultsController.create));

ResultsRouter.put("/:id", asyncHandler(ResultsController.update));

ResultsRouter.delete("/:id", asyncHandler(ResultsController.delete));

export default ResultsRouter;
