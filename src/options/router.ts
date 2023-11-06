import express from "express";
import OptionController from "./controller.js";
import { asyncHandler } from "../middleware/errorHandling/asyncHandler.js";

const OptionRouter = express.Router();

OptionRouter.get("/", asyncHandler(OptionController.getMany));

OptionRouter.get("/:id", asyncHandler(OptionController.getById));

OptionRouter.post("/", asyncHandler(OptionController.create));

OptionRouter.put("/:id", asyncHandler(OptionController.update));

OptionRouter.delete("/:id", asyncHandler(OptionController.delete));

export default OptionRouter;
