import express from "express";
import LessonsController from "./controller.js";
const LessonsRouter = express.Router();
LessonsRouter.get("/", LessonsController.getMany);
LessonsRouter.get("/:id", LessonsController.getById);
LessonsRouter.get("/:type", LessonsController.getById);
LessonsRouter.post("/", LessonsController.create);
LessonsRouter.put("/:id", LessonsController.update);
LessonsRouter.delete("/:id", LessonsController.delete);
export default LessonsRouter;
//# sourceMappingURL=router.js.map