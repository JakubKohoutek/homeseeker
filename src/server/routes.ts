import { Router } from 'express';

import { listAllEstates } from './controller/estates';

const routes = Router();

// Estates
const ESTATE_BASE = '/estates';
routes.get(ESTATE_BASE, listAllEstates);

export default routes;
