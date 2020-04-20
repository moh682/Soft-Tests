import * as mocha from 'mocha';
import chaiHTTP from 'chai-http';
import { use, request, expect, should } from 'chai';
import { IMovement } from '../../src/interfaces/IMovement';
import { MovementMapper } from '../../src/database/MovementMapper';

import { server } from '../../src/server';
import { BankMapper } from '../../src/database/BankMapper';
import { CustomerMapper } from '../../src/database/CustomerMapper';
import { AccountMapper } from '../../src/database/AccountMapper';
import { ICustomer } from '../../src/interfaces/ICustomer';
import { IAccount } from '../../src/interfaces/IAccount';
use(chaiHTTP);

describe('Test Movement route', function () {
  this.timeout(2500);

  const mm = new MovementMapper();
  const bm = new BankMapper();
  const cm = new CustomerMapper();
  const am = new AccountMapper();
  const b = { cvr: '12345678', name: 'Nordea' };
  const c: ICustomer = { bank_cvr: b.cvr, cpr: '123123221', name: 'Mohammad hariri' };
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
                    await Promise.all([am.insert(account), am.insert(otherAccount)]);
                    done();
                  });
              });
          });
      });
  });

  const movement: IMovement = {
    id: 12,
    time: Date.now().toString(),
    amount: 120,
    accountFrom: account.number,
    accountTo: otherAccount.number,
  } as IMovement;

  it('create a movement', function (done) {
    request(server)
      .post('/movement/create')
      .send(movement)
      .end(async (error, res) => {
        expect(error).to.be.null;
        expect(res.status).to.be.equal(200);
        const m = await mm.getById!(movement.id as number);
        expect(m.id).to.be.equal(movement.id);
        expect(m.amount).to.be.equal(movement.amount);
        expect(m.accountFrom).to.be.equal(movement.accountFrom);
        expect(m.accountTo).to.be.equal(movement.accountTo);
        done();
      });
  });

  it('find movement', function (done) {
    request(server)
      .get('/movement/find')
      .send({
        id: movement.id,
      })
      .end((error, res) => {
        expect(error).to.be.null;
        expect(res.status).to.be.equal(200);
        expect(res.body).to.have.property('id');
        expect(res.body).to.have.property('time');
        expect(res.body).to.have.property('amount');
        expect(res.body).to.have.property('accountFrom');
        expect(res.body).to.have.property('accountTo');
        expect(res.body.id).to.be.equal(movement.id);
        expect(res.body.amount).to.be.equal(movement.amount);
        expect(res.body.accountFrom).to.be.equal(movement.accountFrom);
        expect(res.body.accountTo).to.be.equal(movement.accountTo);
        done();
      });
  });
  it('find all movements', function (done) {
    request(server)
      .get('/movement/all')
      .end((error, res) => {
        expect(error).to.be.null;
        expect(res.status).to.be.equal(200);
        expect(res.body[0]).to.have.property('id');
        expect(res.body).to.not.be.empty;
        done();
      });
  });
  it('delete movement', function (done) {
    request(server)
      .delete('/movement/delete/')
      .send({
        id: movement.id,
      })
      .end(async (error, res) => {
        expect(error).to.be.null;
        expect(res.status).to.be.equal(200);
        const m = await mm.getById!(movement.id as number);
        expect(m).to.be.undefined;
        done();
      });
  });
});
