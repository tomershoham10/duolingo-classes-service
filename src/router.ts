import express, { Router } from "express";
import Express from "express";
import optionRouter from "./options/router.js";

const router: Router = express.Router();

router.get("/health", (_req: Express.Request, res: Express.Response) => {
  console.log("health");
  res.status(200).send("Alive");
});

router.use("/api/options/", optionRouter);

export default router;
