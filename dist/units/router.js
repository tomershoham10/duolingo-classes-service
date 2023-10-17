import express from "express";
import UintsController from "./controller.js";
const UintsRouter = express.Router();
UintsRouter.get("/", UintsController.getMany);
UintsRouter.get("/:id", UintsController.getById);
UintsRouter.post("/", UintsController.create);
UintsRouter.put("/:id", UintsController.update);
UintsRouter.delete("/:id", UintsController.delete);
export default UintsRouter;
//# sourceMappingURL=router.js.map