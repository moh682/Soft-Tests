import express from 'express';
import { AccountMapper } from '../database/AccountMapper'
import { IAccount } from '../interfaces/IAccount';
const route = express();

const am = new AccountMapper();

route.get('/', (req, res, next) => {
  return res.sendStatus(200);
});

route.post('/account/create', async (req, res, next) => {
  const account: IAccount = {
    number: req.body.number,
    balance: req.body.balance,
    customer_cpr: req.body.customer_cpr,
    bank_cvr: req.body.bank_cvr,
  };
  am.insert(account);
  if (Error) {
    res.status(400);
  } else {
    res.status(200)
  }
});

route.delete('/account/delete', async (req, res, next) => {
  am.deleteByNumer(req.body.cpr);
  if (Error) {
    res.status(400);
  } else {
    res.status(200)
  }
});

route.get('/account/find', async (req, res, next) => {
  const account = am.getByNumber(req.body.cpr);
  if (Error) {
    res.status(400);
  } else {
    res.json(account)
  }
});

export { route as AccountRoute };
