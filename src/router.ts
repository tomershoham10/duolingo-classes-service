import express, { Router } from "express";
import Express from "express";
import CoursesRouter from "./courses/router.js";
import UnitsRouter from "./units/router.js";
import SectionsRouter from "./sections/router.js";
import LessonsRouter from "./lessons/router.js";
import FSARouter from "./FSA/router.js";
import optionRouter from "./options/router.js";

const router: Router = express.Router();

router.get("/health", (_req: Express.Request, res: Express.Response) => {
  console.log("health");
  res.status(200).send("Alive");
});

router.use("/api/courses/", CoursesRouter);

router.use("/api/units/", UnitsRouter);

router.use("/api/sections/", SectionsRouter);

router.use("/api/lessons/", LessonsRouter);

router.use("/api/FSA/", FSARouter);

router.use("/api/options/", optionRouter);

export default router;
