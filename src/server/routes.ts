import { Router } from 'express';

import { listAllEstates, updateNote, updateStatus } from './controller/estates';

const routes = Router();

// Estates
const ESTATE_BASE = '/estates';
routes.get(ESTATE_BASE, listAllEstates);
routes.post(`${ESTATE_BASE}/:id/status`, updateStatus);
routes.post(`${ESTATE_BASE}/:id/note`, updateNote);

export default routes;
