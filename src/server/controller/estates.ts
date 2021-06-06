import { Request, Response } from 'express';

import { EstateDBRecord } from '../../types';

import { runQuery } from '../service/database';

export const listAllEstates = async (req: Request, res: Response): Promise<void> => {
  try {
    const estates = await runQuery<EstateDBRecord>('SELECT * FROM estates;');

    res
      .status(200)
      .send(estates.map((estate) => ({ ...estate, data: JSON.parse(estate.data) })));
  } catch (error) {
    console.error(error);

    res.status(500).send({ error: error.message });
  }
};

export const updateNote = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { note } = req.body;

  try {
    await runQuery('UPDATE estates SET note = ? WHERE id = ?;', [note, parseInt(id)]);

    res.status(200).send();
  } catch (error) {
    console.error(error);

    res.status(500).send({ error: error.message });
  }
};

export const updateStatus = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    await runQuery('UPDATE estates SET status = ? WHERE id = ?;', [status, parseInt(id)]);

    res.status(200).send();
  } catch (error) {
    console.error(error);

    res.status(500).send({ error: error.message });
  }
};
