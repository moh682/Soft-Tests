import express from 'express';
import { AccountHandler } from '../logic/AccountHandler';
import { AccountMapper } from '../database/AccountMapper';
import { IAccount } from '../interfaces/IAccount';
const route = express();

route.post('/account/transferAmountTo', async (req, res, next) => {

  const ownAccountNumber = req.body.ownAccountNumber;
  const amount = req.body.amount;
  const targetAccountNumber = req.body.targetAccountNumber;

  try {
    const ac = new AccountHandler();
    ac.transferAmountTo(ownAccountNumber, amount, targetAccountNumber);
    return res.status(200).send('Transfered: ' + amount + ' to ' + targetAccountNumber + ' from ' + ownAccountNumber);
  } catch (error) {
    return res.status(500).send(error);
  }

});

route.post('/account/create', async (req, res, next) => {

  const number = req.body.number;
  const balance = req.body.balance;
  const customer_cpr = req.body.customer_cpr;
  const bank_cvr = req.body.bank_cvr;

  try {
    const am = new AccountMapper();
    const createdAccount = await am.insert({ number, balance, customer_cpr, bank_cvr } as IAccount)
    return res.status(200).send('Account created: ' + createdAccount);
  } catch (error) {
    return res.status(500).send(error);
  }
});

route.get('/account/find', async (req, res, next) => {
  const number = req.body.number;

  try {
    const am = new AccountMapper();
    const foundAccount = await am.getByNumber(number);
    return res.status(200).send('Found account: ' + foundAccount);
  } catch (error) {
    return res.status(500).send(error);
  }
});

route.delete('/account/delete', async (req, res, next) => {
  const number = req.body.number;

  try {
    const am = new AccountMapper();
    const deletedAccount = await am.deleteByNumer(number);
    return res.status(200).send('Deleted account' + deletedAccount);
  } catch (error) {
    return res.status(500).send(error);
  }
});

export { route as AccountRoute };
