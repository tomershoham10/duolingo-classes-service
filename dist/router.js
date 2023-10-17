import express from "express";
import ClassesRouter from "./classes/router.js";
import UnitsRouter from "./units/router.js";
import SectionsRouter from "./sections/router.js";
import LessonsRouter from "./lessons/router.js";
import FSARouter from "./FSA/router.js";
import optionRouter from "./options/router.js";
const router = express.Router();
router.get("/health", (_req, res) => {
    console.log("health");
    res.status(200).send("Alive");
});
router.use("/api/classes/", ClassesRouter);
router.use("/api/units/", UnitsRouter);
router.use("/api/sections/", SectionsRouter);
router.use("/api/lessons/", LessonsRouter);
router.use("/api/FSA/", FSARouter);
router.use("/api/options/", optionRouter);
export default router;
//# sourceMappingURL=router.js.map