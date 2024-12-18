import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import router from './router.js';
import config from './utils/config.js';
import { Express } from 'express-serve-static-core';

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
      origin: [
        'http://localhost:3000',
        'https://005d-89-138-135-64.ngrok-free.app',
        'http://89.138.135.64',
      ],
      credentials: true,
      exposedHeaders: ['Authorization'],
    })
  );
  app.use(bodyParser.json());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
};

export default startServer;
