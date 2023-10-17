import express from "express";
import OptionController from "./controller.js";

const optionRouter = express.Router();

// Middleware to log incoming requests for the optionRouter
// optionRouter.use((req: Request, res: Response, next: NextFunction) => {
//   const now = new Date().toLocaleString();
//   console.log(`[${now}] ${req.method} ${req.originalUrl}`);
//   console.log("Headers:", req.headers);

//   // Optionally, log request body (useful for POST and PUT requests)
//   if (["POST", "PUT"].includes(req.method)) {
//     console.log("Request Body:", req.body);
//   } else {
//     console.log("Request query ID:", req.query.id);
//   }

//   next();
// });

optionRouter.get("/", OptionController.getMany);

optionRouter.get("/:id", OptionController.getById);

optionRouter.post("/", OptionController.create);

optionRouter.put("/:id", OptionController.update);

optionRouter.delete("/:id", OptionController.delete);

export default optionRouter;
