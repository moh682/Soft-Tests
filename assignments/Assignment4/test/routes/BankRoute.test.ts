import * as mocha from 'mocha';
import chaiHTTP from 'chai-http';
import { use, request, expect } from 'chai';
import { IBank } from '../../src/interfaces/IBank';
import { BankMapper } from '../../src/database/BankMapper';

import { server } from '../../src/server';
use(chaiHTTP);

describe('Test Bank route', function () {
  this.timeout(1000);
  

  const bm = new BankMapper();

  const bank: IBank = {
    cvr: '213123123123',
    name: 'MohMoh Qviklån'
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
      .delete('/bank/delete/')
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
