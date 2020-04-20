import express from 'express';
import { ICustomer } from '../interfaces/ICustomer';
import { CustomerMapper } from '../database/CustomerMapper';
const route = express();

route.post('/create', async (req, res, next) => {
  const name = req.body.name;
  const bank_cvr = req.body.bank_cvr;
  const cpr = req.body.cpr;

  try {
    const cm = new CustomerMapper();
    const createdCustomer = await cm.insert({ cpr, name, bank_cvr } as ICustomer);
    return res.status(200).send('Customer created: ' + createdCustomer);
  } catch (error) {
    return res.status(500).send(error);
  }
});

route.get('/find', async (req, res, next) => {
  const cpr = req.body.cpr;

  try {
    const cm = new CustomerMapper();
    const foundCustomer = await cm.getByNumber(cpr);
    return res.json(foundCustomer);
  } catch (error) {
    return res.status(500).send(error);
  }
});

route.delete('/delete', async (req, res, next) => {
  const cpr = req.body.cpr;

  try {
    const cm = new CustomerMapper();
    const deletedCustomer = await cm.deleteByNumber(cpr);
    return res.status(200).send('Deleted customer' + deletedCustomer);
  } catch (error) {
    return res.status(500).send(error);
  }
});

export { route as CustomerRoute };
