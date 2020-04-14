import express from 'express';
const route = express();

route.get('/', (req, res, next) => {
  return res.sendStatus(200);
});

route.get('/people/all', async (req, res, next) => {});

route.get('/people/id/:id', async (req, res, next) => {});

export { route as BankRoute };
