import express from "express";
import UnitsController from "./controller.js";
import { asyncHandler } from "../middleware/errorHandling/asyncHandler.js";
const UnitsRouter = express.Router();
UnitsRouter.get("/", asyncHandler(UnitsController.getMany));
UnitsRouter.get("/:id", asyncHandler(UnitsController.getById));
UnitsRouter.post("/", asyncHandler(UnitsController.create));
UnitsRouter.put("/:id", asyncHandler(UnitsController.update));
UnitsRouter.delete("/:id", asyncHandler(UnitsController.delete));
export default UnitsRouter;
//# sourceMappingURL=router.js.map