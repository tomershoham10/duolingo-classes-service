import express from "express";
import OptionController from "./controller.js";
import { asyncHandler } from "../middleware/errorHandling/asyncHandler.js";
const optionRouter = express.Router();
optionRouter.get("/", asyncHandler(OptionController.getMany));
optionRouter.get("/:id", asyncHandler(OptionController.getById));
optionRouter.post("/", asyncHandler(OptionController.create));
optionRouter.put("/:id", asyncHandler(OptionController.update));
optionRouter.delete("/:id", asyncHandler(OptionController.delete));
export default optionRouter;
//# sourceMappingURL=router.js.map