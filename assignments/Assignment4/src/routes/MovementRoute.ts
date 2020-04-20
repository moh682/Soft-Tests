import express, { Request, Response } from 'express';
import { IMovement } from '../interfaces/IMovement';
import { MovementMapper } from '../database/MovementMapper';
const route = express();

const mm = new MovementMapper();

route.post('/create', async (req: Request, res: Response) => {
  const { id, time, amount, accountFrom, accountTo } = req.body as IMovement;

  try {
    const createdMovement = await mm.insert({ id, time, amount, accountFrom, accountTo } as IMovement);
    return res.status(200).send('Movement created: ' + createdMovement);
  } catch (error) {
    return res.status(500).send(error);
  }
});

route.get('/find', async (req: Request, res: Response) => {
  const id: number = req.body.id as number;

  try {
    const foundMovement = await mm.getById!(id as number);
    return res.json(foundMovement);
  } catch (error) {
    return res.status(500).send(error);
  }
});

route.get('/all', async (req: Request, res: Response) => {
  try {
    const foundMovements = await mm.getAll!();
    return res.json(foundMovements);
  } catch (error) {
    return res.status(500).send(error);
  }
});

route.delete('/delete', async (req: Request, res: Response) => {
  const id = req.body.id;

  try {
    const deletedMovement = await mm.deleteById!(id as number);
    return res.status(200).send('Deleted movement' + deletedMovement);
  } catch (error) {
    console.error(error);
    return res.status(500).send(error);
  }
});

export { route as MovementRoute };
