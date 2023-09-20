import express from "express";
import optionRouter from "./options/router.js";
const router = express.Router();
router.get("/health", (_req, res) => {
    console.log("health");
    res.status(200).send("Alive");
});
router.use("/api/options/", optionRouter);
export default router;
//# sourceMappingURL=router.js.map