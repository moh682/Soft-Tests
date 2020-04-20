import * as mocha from 'mocha';
import chaiHTTP from 'chai-http';
import { use, request, expect } from 'chai';
import { IAccount } from '../../src/interfaces/IAccount';
import { AccountMapper } from '../../src/database/AccountMapper';

import { server } from '../../src/server';
use(chaiHTTP);

describe('Test Account route', function () {
  this.timeout(1000);
  

  const am = new AccountMapper();

  const account: IAccount = {
      balance: 1234,
      bank_cvr: '213123123123',
      customer_cpr: '13131213123123',
      number: 123456
  };

  const otherAccount: IAccount = {
    balance: 3000,
    bank_cvr: '213123123123',
    customer_cpr: '13131213123123',
    number: 1234567
  }

  it('create an account', function (done) {
    request(server)
      .post('/account/create')
      .send(account)
      .end(async (error, res) => {
        expect(error).to.be.null;
        expect(res.status).to.be.equal(200);
        const a = await am.getByNumber(account.number);
        expect(a.balance).to.be.equal(account.balance);
        expect(a.bank_cvr).to.be.equal(account.bank_cvr);
        expect(a.customer_cpr).to.be.equal(account.customer_cpr);
        expect(a.number).to.be.equal(account.number);
        done();
      });
  });
  it('transfer amount to account', function (done) {
    request(server)
      .delete('/account/transferAmountTo')
      .send({
        ownAccountNumber: account.number, 
        amount: 1000, 
        targetAccountNumber: 1234567
      })
      .end(async (error, res) => {
        expect(error).to.be.null;
        expect(res.status).to.be.equal(200);
        const a = await am.getByNumber(account.number);
        const a2 = await am.getByNumber(otherAccount.number);
        expect(a.balance).to.be.equal(account.balance + 1000);
        expect(a2.balance).to.be.equal(otherAccount.balance - 1000);
        done();
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
        expect(res.body.balance).to.be.equal(account.balance + 1000 || account.balance);
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
        const a = await am.getByNumber(account.number);
        expect(a).to.be.undefined;
        done();
      });
  });

});
