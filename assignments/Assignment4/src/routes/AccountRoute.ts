import express from 'express';
import { AccountHandler } from '../logic/AccountHandler';
import { AccountMapper } from '../database/AccountMapper';
import { IAccount } from '../interfaces/IAccount';
const route = express();

const ac = new AccountHandler();
const am = new AccountMapper();

route.post('/transferAmountTo', async (req, res, next) => {
  const ownAccountNumber = req.body.ownAccountNumber;
  const amount = req.body.amount;
  const targetAccountNumber = req.body.targetAccountNumber;

  try {
    await ac.transferAmountTo(ownAccountNumber, amount, targetAccountNumber);
    return res.status(200).json({ Transfered: amount, to: targetAccountNumber, from: ownAccountNumber });
  } catch (error) {
    return res.status(500).send(error);
  }
});

route.post('/create', async (req, res, next) => {
  const number = req.body.number;
  const balance = req.body.balance;
  const customer_cpr = req.body.customer_cpr;
  const bank_cvr = req.body.bank_cvr;

  try {
    await am.insert({ number, balance, customer_cpr, bank_cvr } as IAccount);
    return res.status(200).send(`Creation of account with number: ${number} has been successful`);
  } catch (error) {
    return res.status(500).send(error);
  }
});

route.get('/find', async (req, res, next) => {
  const number = req.body.number;

  try {
    const foundAccount = await am.getByNumber(number).catch(error => console.error(error));
    return res.send(foundAccount);
  } catch (error) {
    return res.status(500).send(error);
  }
});

route.delete('/delete', async (req, res, next) => {
  const number = req.body.number;

  try {
    const deletedAccount = await am.deleteByNumer(number);
    return res.status(200).send(`Deletion of movement with number: ${number} has been successful`);
  } catch (error) {
    return res.status(500).send(error);
  }
});

export { route as AccountRoute };
