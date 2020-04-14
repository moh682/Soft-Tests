import * as mocha from 'mocha';
import chaiHTTP from 'chai-http';
import { use, request, expect } from 'chai';
import { ICustomer } from '../../src/interfaces/ICustomer';
import { CustomerMapper } from '../../src/database/CustomerMapper';

import { server } from '../../src/server';
use(chaiHTTP);

describe('Test Customer route', function () {
  this.timeout(1000);

  const cm = new CustomerMapper();

  const customer: ICustomer = {
    name: 'peter',
    bank_cvr: '213123123123',
    cpr: '13131213123123',
  };

  it('create a customer', function (done) {
    request(server)
      .post('/customer/create')
      .send(customer)
      .end((error, res) => {
        expect(error).to.be.null;
        expect(res.status).to.be.equal(200);
        done();
      });
  });
  it('test find customer route', function (done) {
    request(server)
      .get('/customer/find')
      .send({
        cpr: customer.cpr,
      })
      .end((error, res) => {
        expect(error).to.be.null;
        expect(res.status).to.be.equal(200);
        expect(res.body).to.have.property('name');
        expect(res.body).to.have.property('bank_cvr');
        expect(res.body).to.have.property('cpr');
        expect(res.body.name).to.be.equal(customer.name);
        expect(res.body.cpr).to.be.equal(customer.cpr);
        expect(res.body.bank_cvr).to.be.equal(customer.bank_cvr);
        done();
      });
  });
  it('test delete customer route', function (done) {
    request(server)
      .delete('/customer/delete/')
      .send({
        cpr: customer.cpr,
      })
      .end(async (error, res) => {
        expect(error).to.be.null;
        expect(res.status).to.be.equal(200);
        const c = await cm.getByNumber(customer.cpr);
        expect(c).to.be.undefined;
        done();
      });
  });
});
