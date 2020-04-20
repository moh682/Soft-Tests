import * as mocha from 'mocha';
import chaiHTTP from 'chai-http';
import { use, request, expect, should } from 'chai';
import { IAccount } from '../../src/interfaces/IAccount';
import { AccountMapper } from '../../src/database/AccountMapper';

import { server } from '../../src/server';
import { BankMapper } from '../../src/database/BankMapper';
import { CustomerMapper } from '../../src/database/CustomerMapper';
import { MovementMapper } from '../../src/database/MovementMapper';
import { ICustomer } from '../../src/interfaces/ICustomer';
use(chaiHTTP);

const am = new AccountMapper();

describe('Test Account route', function () {
  this.timeout(2500);

  const bm = new BankMapper();
  const cm = new CustomerMapper();
  const mm = new MovementMapper();
  const am = new AccountMapper();
  const b = { cvr: '12345678', name: 'Nordea' };
  const c: ICustomer = { bank_cvr: b.cvr, cpr: '123123221', name: 'Mohammad hariri' };

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
                    await cm.insert(c);
                    done();
                  });
              });
          });
      });
  });

  const account: IAccount = {
    number: 123123,
    balance: 1234,
    bank_cvr: b.cvr,
    customer_cpr: c.cpr,
  };

  const otherAccount: IAccount = {
    number: 123124,
    balance: 3000,
    bank_cvr: b.cvr,
    customer_cpr: c.cpr,
  };

  it('create an account', function (done) {
    request(server)
      .post('/account/create')
      .send(account)
      .end(async (error, res) => {
        expect(error).to.be.null;
        expect(res.status).to.be.equal(200);
        const a = await am.getByNumber(account.number as number);
        expect(a).to.not.be.undefined;
        expect(a.balance).to.be.equal(account.balance);
        expect(a.bank_cvr).to.be.equal(account.bank_cvr);
        expect(a.customer_cpr).to.be.equal(account.customer_cpr);
        expect(a.number).to.be.equal(account.number);
        done();
      });
  });
  it('transfer amount to account', function (done) {
    am.insert!(otherAccount)
      .catch(error => console.error(error))
      .finally(() => {
        request(server)
          .post('/account/transferAmountTo')
          .send({
            ownAccountNumber: account.number,
            amount: 1000,
            targetAccountNumber: otherAccount.number,
          })
          .end((error, res) => {
            Promise.all([am.getByNumber(account.number as number), am.getByNumber(otherAccount.number as number)]).then(
              accounts => {
                const a = accounts[0];
                const a2 = accounts[1];
                expect(error).to.be.null;
                expect(res.status).to.be.equal(200);
                expect(a.balance).to.be.equal(account.balance - 1000);
                expect(a2.balance).to.be.equal(otherAccount.balance + 1000);
                done();
              },
            );
          });
      });
  });
  it('find account', function (done) {
    request(server)
      .get('/account/find')
      .send({
        number: account.number,
      })
      .end((error, res) => {
        expect(error).to.be.null;
        expect(res.status).to.be.equal(200);
        expect(res.body).to.have.property('balance');
        expect(res.body).to.have.property('bank_cvr');
        expect(res.body).to.have.property('customer_cpr');
        expect(res.body).to.have.property('number');
        expect(res.body.balance).to.be.equal(account.balance - 1000);
        expect(res.body.bank_cvr).to.be.equal(account.bank_cvr);
        expect(res.body.customer_cpr).to.be.equal(account.customer_cpr);
        expect(res.body.number).to.be.equal(account.number);
        done();
      });
  });
  it('delete account', function (done) {
    request(server)
      .delete('/account/delete')
      .send({
        number: account.number,
      })
      .end(async (error, res) => {
        expect(error).to.be.null;
        expect(res.status).to.be.equal(200);
        const a = await am.getByNumber(account.number as number);
        expect(a).to.be.undefined;
        done();
      });
  });
});
