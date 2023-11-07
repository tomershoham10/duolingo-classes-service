import express from "express";
import CoursesRouter from "./courses/router.js";
import UnitsRouter from "./units/router.js";
import LevelsRouter from "./levels/router.js";
import LessonsRouter from "./lessons/router.js";
import FSARouter from "./FSA/router.js";
import OptionRouter from "./options/router.js";
import ResultsRouter from "./results/router.js";
const router = express.Router();
router.get("/health", (_req, res) => {
    console.log("health");
    res.status(200).send("Alive");
});
router.use("/api/courses/", CoursesRouter);
router.use("/api/units/", UnitsRouter);
router.use("/api/levels/", LevelsRouter);
router.use("/api/lessons/", LessonsRouter);
router.use("/api/FSA/", FSARouter);
router.use("/api/options/", OptionRouter);
router.use("/api/results/", ResultsRouter);
export default router;
//# sourceMappingURL=router.js.map