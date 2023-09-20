import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import router from "./router.js";
import config from "./utils/config.js";
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
const configureMiddlewares = (app) => {
    //   app.use((req: Request, res: Response, next: NextFunction) => {
    //     const now = new Date().toLocaleString();
    //     console.log(`[${now}] ${req.method} ${req.originalUrl}`);
    //     console.log("Headers:", req.headers);
    //     if (["POST", "PUT"].includes(req.method)) {
    //       console.log("Request Body:", req.body);
    //     } else {
    //       console.log("Request query ID:", req.query.id);
    //     }
    //     next();
    //   });
    app.use(bodyParser.json());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
};
export default startServer;
//# sourceMappingURL=server.js.map