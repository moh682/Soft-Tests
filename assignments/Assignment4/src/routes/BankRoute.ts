import express from 'express';
import { IBank } from '../interfaces/IBank';
import { BankMapper } from '../database/BankMapper';
const route = express();

const bm = new BankMapper();

route.post('/create', async (req, res, next) => {
  console.log(req.body);
  const cvr = req.body.cvr;
  const name = req.body.name;

  try {
    await bm.insert({ cvr, name } as IBank);
    return res.status(200).send(`Creation of bank with cvr: ${cvr} has been successful`);
  } catch (error) {
    console.error(error);
    return res.status(500).send(error);
  }
});

route.get('/find', async (req, res, next) => {
  const cvr = req.body.cvr;

  try {
    const foundBank = await bm.getByCvr(cvr);
    return res.json(foundBank);
  } catch (error) {
    console.error(error);
    return res.status(500).send(error);
  }
});

route.get('/all', async (req, res, next) => {
  try {
    const foundBank = await bm.getAll();
    return res.json(foundBank);
  } catch (error) {
    console.error(error);
    return res.status(500).send(error);
  }
});

route.delete('/delete', async (req, res, next) => {
  const cvr = req.body.cvr;

  try {
    await bm.deleteByCvr(cvr);
    return res.status(200).send(`Deletion of bank with cvr: ${cvr} has been successful`);
  } catch (error) {
    console.error(error);
    return res.status(500).send(error);
  }
});

export { route as BankRoute };
