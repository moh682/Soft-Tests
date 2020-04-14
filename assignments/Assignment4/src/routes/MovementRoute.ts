import express, { Request, Response } from 'express';
const route = express();

route.post('/login', async (req: Request, res: Response) => {});

route.post('/register', async (req: Request, res: Response) => {});
export { route as MovementRoute };
