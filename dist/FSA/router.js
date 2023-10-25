import express from "express";
import FSAController from "./controller.js";
import { asyncHandler } from "../middleware/errorHandling/asyncHandler.js";
const FSARouter = express.Router();
FSARouter
    .get("/answers/:answerId", asyncHandler(FSAController.getByAnswerId))
    .get("/:id", asyncHandler(FSAController.getById))
    .get("/", asyncHandler(FSAController.getMany));
FSARouter
    .post("/", asyncHandler(FSAController.create));
FSARouter.put("/:id", asyncHandler(FSAController.update));
FSARouter.delete("/:id", asyncHandler(FSAController.delete));
export default FSARouter;
//# sourceMappingURL=router.js.map