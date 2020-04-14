import express from 'express';

const route = express();

route.get('class/all', async (req, res, next) => {});

route.post('class/add', async (req, res, next) => {});

export { route as CustomerRoute };
