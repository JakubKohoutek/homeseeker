import { Request, Response } from 'express';

import { EstateDBRecord } from '../../types';

import { runQuery } from '../service/database';

export const listAllEstates = async (req: Request, res: Response): Promise<void> => {
  try {
    const estates = await runQuery<EstateDBRecord>('SELECT * FROM estates');

    res
      .status(200)
      .send(estates.map((estate) => ({ ...estates, data: JSON.parse(estate.data) })));
  } catch (error) {
    console.error(error);

    res.status(500).send({ error: error.message });
  }
};
