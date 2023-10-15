import express, { Router } from "express";
import Express from "express";
import LessonsRouter from "./lessons/router.js";
import optionRouter from "./options/router.js";
import FSARouter from "./FSA/router.js";

const router: Router = express.Router();

router.get("/health", (_req: Express.Request, res: Express.Response) => {
  console.log("health");
  res.status(200).send("Alive");
});

router.use("/api/lessons/", LessonsRouter);

router.use("/api/options/", optionRouter);

router.use("/api/FSA/", FSARouter);

export default router;
