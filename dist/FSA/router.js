import express from "express";
import FSAController from "./controller.js";
const FSARouter = express.Router();
FSARouter.get("/", FSAController.getMany);
FSARouter.get("/:id", FSAController.getById);
FSARouter.post("/", FSAController.create);
FSARouter.put("/:id", FSAController.update);
FSARouter.delete("/:id", FSAController.delete);
export default FSARouter;
//# sourceMappingURL=router.js.map