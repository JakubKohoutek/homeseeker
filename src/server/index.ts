import express, { Request, Response } from 'express';
import { Server } from 'http';
import cors from 'cors';

import routes from './routes';
import { fetchAndStoreEstates } from './service/estates';

const PORT = process.env.PORT || 4321;
const BASE_API_URL = process.env.BASE_API_URL || '/api';

const createServer = (): Server => {
  // Create server
  const app = express();

  // Set CORS policy
  app.use(cors());

  // Add services
  app.get('/', (req: Request, res: Response) => {
    console.log(req.body);
    res.send({ status: 'OK' });
  });

  app.use(BASE_API_URL, routes);

  // Listen on selected port
  return app.listen(PORT, (): void => {
    fetchAndStoreEstates();
    console.info(`Server is listening on sport ${PORT}!`);
  });
};

createServer();
