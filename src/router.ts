import { Router, Request, Response } from "express";
import CoursesRouter from "./courses/router.js";
import UnitsRouter from "./units/router.js";
import LevelsRouter from "./levels/router.js";
import LessonsRouter from "./lessons/router.js";
import ExercisesRouter from "./exercises/router.js";
import CountryRouter from "./countries/router.js";
import TargetRouter from "./targets/router.js";
import ResultsRouter from "./results/router.js";
import SourcesRouter from "./sources/router.js";

const router: Router = Router();

router.get("/health", (_req: Request, res: Response) => {
  console.log("health");
  res.status(200).send("Alive");
});

router.use("/api/courses/", CoursesRouter);

router.use("/api/units/", UnitsRouter);

router.use("/api/levels/", LevelsRouter);

router.use("/api/lessons/", LessonsRouter);

router.use("/api/exercises/", ExercisesRouter);

router.use("/api/countries/", CountryRouter);

router.use("/api/targets/", TargetRouter);

router.use("/api/results/", ResultsRouter);

router.use("/api/sources/", SourcesRouter);

export default router;
