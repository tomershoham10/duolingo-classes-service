import express from "express";
import UnitsController from "./controller.js";

const UnitsRouter = express.Router();

UnitsRouter.get("/", UnitsController.getMany);

UnitsRouter.get("/:id", UnitsController.getById);

UnitsRouter.post("/", UnitsController.create);

UnitsRouter.put("/:id", UnitsController.update);

UnitsRouter.delete("/:id", UnitsController.delete);

export default UnitsRouter;
