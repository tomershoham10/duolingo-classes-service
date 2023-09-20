import express from "express";
import OptionController from "./controller.js";
const optionRouter = express.Router();
optionRouter.get("/", OptionController.getMany);
optionRouter.get("/:id", OptionController.getById);
optionRouter.post("/", OptionController.create);
optionRouter.put("/:id", OptionController.update);
optionRouter.delete("/:id", OptionController.delete);
export default optionRouter;
//# sourceMappingURL=route.js.map