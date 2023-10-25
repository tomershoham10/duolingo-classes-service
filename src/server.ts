import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import router from "./router.js";
import config from "./utils/config.js";
import { Express } from "express-serve-static-core";

const startServer = () => {
  const port = config.http.port;
  const app = express();
  configureMiddlewares(app);
  app.use(router);
  app.use(cors());

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
};

const configureMiddlewares = (app: Express) => {
  app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
      exposedHeaders: ["Authorization"],
    })
  );
  app.use(bodyParser.json());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  //   app.use((req: Request, res: Response, next: NextFunction) => {
  //     const now = new Date().toLocaleString();
  //     console.log(`[${now}] ${req.method} ${req.originalUrl}`);
  //     console.log("Headers:", req.headers);
  //     if (["POST", "PUT"].includes(req.method)) {
  //       console.log("Request Body:", req.body);
  //     } else {
  //       console.log("Request params ID:", req.params.id);
  //     }

  //     next();
  //   });

};

export default startServer;
