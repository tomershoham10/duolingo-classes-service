import express from "express";
import LessonsRouter from "./lessons/router.js";
import optionRouter from "./options/router.js";
import FSARouter from "./FSA/router.js";
const router = express.Router();
router.get("/health", (_req, res) => {
    console.log("health");
    res.status(200).send("Alive");
});
router.use("/api/lessons/", LessonsRouter);
router.use("/api/options/", optionRouter);
router.use("/api/FSA/", FSARouter);
export default router;
//# sourceMappingURL=router.js.map