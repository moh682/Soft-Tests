import express from 'express';
import { ICustomer } from '../interfaces/ICustomer';
import { CustomerMapper } from '../database/CustomerMapper';
const route = express();

const cm = new CustomerMapper();

route.post('/create', async (req, res, next) => {
  const name = req.body.name;
  const bank_cvr = req.body.bank_cvr;
  const cpr = req.body.cpr;

  if (name === '' || bank_cvr === '' || cpr === '') return res.sendStatus(401);

  try {
    await cm.insert({ cpr, name, bank_cvr } as ICustomer);
    return res.status(200).send(`Creation of customer with name ${name} has been successful`);
  } catch (error) {
    return res.status(500).send(error);
  }
});

route.get('/find', async (req, res, next) => {
  const cpr = req.body.cpr;

  try {
    const foundCustomer = await cm.getByNumber(cpr);
    return res.json(foundCustomer);
  } catch (error) {
    return res.status(500).send(error);
  }
});

route.get('/all', async (req, res, next) => {
  try {
    const customers = await cm.getAll();
    return res.json(customers);
  } catch (error) {
    return res.status(500).send(error);
  }
});

route.delete('/delete', async (req, res, next) => {
  const cpr = req.body.cpr;

  try {
    const deletedCustomer = await cm.deleteByNumber(cpr);
    return res.status(200).send(`Deletion of customer with cpr: ${cpr} has been successful`);
  } catch (error) {
    return res.status(500).send(error);
  }
});

export { route as CustomerRoute };
