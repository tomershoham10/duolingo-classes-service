import express from "express";
import SectionsController from "./controller.js";
const SectionsRouter = express.Router();
SectionsRouter.get("/", SectionsController.getMany);
SectionsRouter.get("/:id", SectionsController.getById);
SectionsRouter.post("/", SectionsController.create);
SectionsRouter.put("/:id", SectionsController.update);
SectionsRouter.delete("/:id", SectionsController.delete);
export default SectionsRouter;
//# sourceMappingURL=router.js.map