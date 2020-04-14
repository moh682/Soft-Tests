import express from 'express';
const route = express();
import { BankMapper } from '../database/BankMapper'
import { IBank } from '../interfaces/IBank';

const bm = new BankMapper();

route.get('/bank/all', async (req, res, next) => {
  const banks = bm.getAll();
  if (Error) {
    res.status(400);
  } else {
    res.json(banks)
  }
});

route.post('/bank/create', async (req, res, next) => {
  const bank: IBank = {
    cvr: req.body.cvr,
    name: req.body.name,
  };
  bm.insert(bank);
  if (Error) {
    res.status(400);
  } else {
    res.status(200)
  }
});

route.delete('/bank/delete', async (req, res, next) => {
  bm.deleteByCvr(req.body.cvr);
  if (Error) {
    res.status(400);
  } else {
    res.status(200)
  }
});



export { route as BankRoute };
