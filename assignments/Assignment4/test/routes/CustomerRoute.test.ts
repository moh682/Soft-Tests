import * as mocha from 'mocha';
import chaiHTTP from 'chai-http';
import { use, request, expect, should } from 'chai';
import { ICustomer } from '../../src/interfaces/ICustomer';
import { CustomerMapper } from '../../src/database/CustomerMapper';

import { server } from '../../src/server';
import { BankMapper } from '../../src/database/BankMapper';
import { MovementMapper } from '../../src/database/MovementMapper';
import { AccountMapper } from '../../src/database/AccountMapper';
use(chaiHTTP);

describe('Test Customer route', function () {
  this.timeout(2500);

  const cm = new CustomerMapper();
  const bm = new BankMapper();
  const mm = new MovementMapper();
  const am = new AccountMapper();
  const b = { cvr: '12345678', name: 'Nordea' };

  this.beforeAll(function (done) {
    mm.deleteAll()
      .catch(error => {
        should().not.exist(error, 'error occured');
      })
      .finally(() => {
        am.deleteAll()
          .catch(error => {
            should().not.exist(error, 'error occured');
          })
          .finally(() => {
            cm.deleteAll()
              .catch(error => {
                should().not.exist(error, 'error occured');
              })
              .finally(() => {
                bm.deleteAll()
                  .catch(error => {
                    should().not.exist(error, 'error occured');
                  })
                  .finally(async () => {
                    await bm.insert(b);
                    done();
                  });
              });
          });
      });
  });
  const customer: ICustomer = {
    name: 'peter',
    bank_cvr: b.cvr,
    cpr: '121233212',
  };

  it('create a customer', function (done) {
    request(server)
      .post('/customer/create')
      .send(customer)
      .end(async (error, res) => {
        expect(error).to.be.null;
        expect(res.status).to.be.equal(200);
        const c = await cm.getByNumber(customer.cpr);
        expect(c.name).to.be.equal(customer.name);
        expect(c.bank_cvr).to.be.equal(customer.bank_cvr);
        expect(c.cpr).to.be.equal(customer.cpr);
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
