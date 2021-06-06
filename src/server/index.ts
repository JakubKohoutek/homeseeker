import express, { Request, Response } from 'express';
import { Server } from 'http';
import cors from 'cors';
import { json } from 'body-parser';

import routes from './routes';
import { fetchAndStoreEstates } from './service/estates';

const PORT = process.env.PORT || 4321;
const BASE_API_URL = process.env.BASE_API_URL || '/api';
const FETCH_INTERVAL = process.env.FETCH_INTERVAL
  ? parseInt(process.env.FETCH_INTERVAL)
  : 1000 * 60 * 10;

const createServer = (): Server => {
  // Create server
  const app = express();

  // Set CORS policy and other middleware
  app.use(cors());
  app.use(json());

  // Add services
  app.get('/', (req: Request, res: Response) => {
    console.log(req.body);
    res.send({ status: 'OK' });
  });

  app.use(BASE_API_URL, routes);

  // Listen on selected port
  return app.listen(PORT, (): void => {
    fetchAndStoreEstates();
    console.info(
      `Setting up job that will fetch new estates every ${
        FETCH_INTERVAL / 60 / 1000
      } minutes`
    );
    setInterval(() => {
      fetchAndStoreEstates();
    }, FETCH_INTERVAL);
    console.info(`Server is listening on sport ${PORT}!`);
  });
};

createServer();
