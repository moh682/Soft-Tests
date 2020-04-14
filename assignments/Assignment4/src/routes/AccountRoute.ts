import express from 'express';
import { AccountHandler } from '../logic/AccountHandler';
const route = express();

route.get('/', (req, res, next) => {
  return res.sendStatus(200);
});

route.post('/account/transferAmountTo', async (req, res, next) => {

  const ac = new AccountHandler();
  ac.transferAmountTo(req.body.currentAccountNumber, res.body.amount, res.body.targetAccountNumber);

});

route.get('/people/all', async (req, res, next) => {});

route.get('/people/id/:id', async (req, res, next) => {});

export { route as AccountRoute };
