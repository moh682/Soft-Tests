import * as mocha from 'mocha';
import chaiHTTP from 'chai-http';
import { use, request, expect, should } from 'chai';
import { IBank } from '../../src/interfaces/IBank';
import { BankMapper } from '../../src/database/BankMapper';

import { server } from '../../src/server';
import { CustomerMapper } from '../../src/database/CustomerMapper';
import { MovementMapper } from '../../src/database/MovementMapper';
import { AccountMapper } from '../../src/database/AccountMapper';
use(chaiHTTP);

describe('Test Bank route', function () {
  this.timeout(2500);

  const bm = new BankMapper();
  const cm = new CustomerMapper();
  const mm = new MovementMapper();
  const am = new AccountMapper();

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
                  .finally(() => {
                    done();
                  });
              });
          });
      });
  });

  const bank: IBank = {
    cvr: '12312312',
    name: 'MohMoh Qviklån',
  };

  it('create a bank', function (done) {
    request(server)
      .post('/bank/create')
      .send(bank)
      .end(async (error, res) => {
        expect(error).to.be.null;
        expect(res.status).to.be.equal(200);
        const b = await bm.getByCvr(bank.cvr);
        expect(b.cvr).to.be.equal(bank.cvr);
        expect(b.name).to.be.equal(bank.name);
        done();
      });
  });
  it('find bank', function (done) {
    request(server)
      .get('/bank/find')
      .send({
        cvr: bank.cvr,
      })
      .end((error, res) => {
        expect(error).to.be.null;
        expect(res.status).to.be.equal(200);
        expect(res.body).to.have.property('cvr');
        expect(res.body).to.have.property('name');
        expect(res.body.cvr).to.be.equal(bank.cvr);
        expect(res.body.name).to.be.equal(bank.name);
        done();
      });
  });
  it('delete bank', function (done) {
    request(server)
      .delete('/bank/delete')
      .send({
        cvr: bank.cvr,
      })
      .end(async (error, res) => {
        expect(error).to.be.null;
        expect(res.status).to.be.equal(200);
        const b = await bm.getByCvr(bank.cvr);
        expect(b).to.be.undefined;
        done();
      });
  });
});
