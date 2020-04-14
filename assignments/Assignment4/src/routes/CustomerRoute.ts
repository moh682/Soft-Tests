import express from 'express';

const route = express();

import { CustomerMapper } from '../database/CustomerMapper'
import { ICustomer } from '../interfaces/ICustomer';

const cm = new CustomerMapper();

route.post('/customer/create', async (req, res, next) => {
    const customer: ICustomer = {
        cpr: req.body.cpr,
        name: req.body.name,
        bank_cvr: req.body.bank_cvr,
    };
    cm.insert(customer);
    if (Error) {
        res.status(400);
    } else {
        res.status(200)
    }
});

route.delete('/customer/delete', async (req, res, next) => {
    cm.deleteByNumber(req.body.cvr);
    if (Error) {
        res.status(400);
    } else {
        res.status(200)
    }
});

route.get('/customer/find', async (req, res, next) => {
    const account = cm.getByNumber(req.body.cpr);
    if (Error) {
        res.status(400);
    } else {
        res.json(account)
    }
});


export { route as CustomerRoute };
