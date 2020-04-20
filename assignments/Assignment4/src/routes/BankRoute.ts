import express from 'express';
import { IBank } from '../interfaces/IBank';
import { BankMapper } from '../database/BankMapper';
const route = express();

const bm = new BankMapper();

route.post('/create', async (req, res, next) => {
  const cvr = req.body.cvr;
  const name = req.body.name;

  try {
    const createdBank = await bm.insert({ cvr, name } as IBank);
    return res.status(200).send('Bank created: ' + createdBank);
  } catch (error) {
    return res.status(500).send(error);
  }
});

route.get('/find', async (req, res, next) => {
  const cvr = req.body.cvr;

  try {
    const foundBank = await bm.getByCvr(cvr);
    return res.json(foundBank);
  } catch (error) {
    return res.status(500).send(error);
  }
});

route.delete('/delete', async (req, res, next) => {
  const cvr = req.body.cvr;

  try {
    const deletedBank = await bm.deleteByCvr(cvr);
    return res.status(200).send('Deleted bank' + deletedBank);
  } catch (error) {
    return res.status(500).send(error);
  }
});

export { route as BankRoute };
