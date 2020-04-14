import * as mocha from 'mocha';
import chaiHTTP from 'chai-http';
import { use, request, expect } from 'chai';
import { IMovement } from '../../src/interfaces/IMovement';
import { MovementMapper } from '../../src/database/MovementMapper';

import { server } from '../../src/server';
use(chaiHTTP);

describe('Test Movement route', function () {
  this.timeout(1000);
  

  const mm = new MovementMapper();

  const movement: IMovement = {
	id: 12,
	time: Date.now().toString(),
	amount: 120,
	accountFrom: 12121212,
	accountTo: 12121212
  };

  it('create a movement', function (done) {
    request(server)
      .post('/movement/create')
      .send(movement)
      .end(async (error, res) => {
        expect(error).to.be.null;
        expect(res.status).to.be.equal(200);
        const m = await mm.getById(movement.id);
        expect(m.id).to.be.equal(movement.id);
        expect(m.amount).to.be.equal(movement.amount);
        expect(m.time).to.be.equal(movement.time);
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
        expect(res.body.time).to.be.equal(movement.time);
        expect(res.body.accountFrom).to.be.equal(movement.accountFrom);
        expect(res.body.accountTo).to.be.equal(movement.accountTo);
        done();
      });
  });
  it('find all movements', function (done) {
    request(server)
      .get('/movement/findAll')
      .end((error, res) => {
        expect(error).to.be.null;
        expect(res.status).to.be.equal(200);
        expect(res.body[0]).to.have.property('id');
        expect(res.body[1]).to.have.property('id');
        expect(res.body[2]).to.have.property('id');
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
        const m = await mm.getById(movement.id);
        expect(m).to.be.undefined;
        done();
      });
  });
});
