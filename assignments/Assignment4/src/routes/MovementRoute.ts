import express from 'express';
import { MovementMapper } from '../database/MovementMapper';
import { IMovement } from '../interfaces/IMovement';
const route = express();


const mm = new MovementMapper();

route.post('/movement/create', async (req, res, next) => {
    const movement: IMovement = {
        id: req.body.id,
        time: req.body.time,
        amount: req.body.amount,
        accountFrom: req.body.accountFrom,
        accountTo: req.body.accountTo,
    };
    mm.insert(movement);
    if (Error) {
        res.status(400);
    } else {
        res.status(200)
    }
});

route.delete('/movement/delete', async (req, res, next) => {
    mm.deleteById(req.body.id);
    if (Error) {
        res.status(400);
    } else {
        res.status(200)
    }
});

route.get('/customer/find', async (req, res, next) => {
    const movement = mm.getById(req.body.id);
    if (Error) {
        res.status(400);
    } else {
        res.json(movement)
    }
});

export { route as MovementRoute };

