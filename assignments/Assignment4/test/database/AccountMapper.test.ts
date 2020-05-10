import * as mocha from 'mocha';
import { expect, should } from 'chai';
import { BankMapper } from '../../src/database/BankMapper';
import { CustomerMapper } from '../../src/database/CustomerMapper';
import { MovementMapper } from '../../src/database/MovementMapper';
import { AccountMapper } from '../../src/database/AccountMapper';
import { ICustomer } from '../../src/interfaces/ICustomer';
import { IAccount } from '../../src/interfaces/IAccount';

describe('Test Account', function () {
  const bm = new BankMapper();
  const cm = new CustomerMapper();
  const mm = new MovementMapper();
  const am = new AccountMapper();
  const b = { cvr: '12345678', name: 'Rasmus Qviklån' };
  const c: ICustomer = { bank_cvr: b.cvr, cpr: '050196-2132', name: 'Mohammad hariri' };
  const a: IAccount = { balance: 1000, bank_cvr: b.cvr, customer_cpr: c.cpr, number: 1 };

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
                  .finally(() => done());
              });
          });
      });
  });

  it('test insert account', async function () {
    await bm.insert(b).catch(error => {
      should().not.exist(error, 'error occured');
    });
    await cm.insert(c).catch(error => {
      should().not.exist(error, 'error occured');
    });
    await am.insert(a).catch(error => {
      should().not.exist(error, 'error occured');
    });
    const account: any = await am.getAll().catch(error => {
      should().not.exist(error, 'error occured');
    });
    expect(account).to.not.be.empty;
    expect(account.length).to.be.equal(1);
  });

  it('test get account', async function () {
    const accounts: any = await am.getByNumber(a.number!).catch(error => {
      should().not.exist(error, 'error occured');
    });

    expect(accounts).to.not.be.undefined;
    expect(accounts.bank_cvr).to.be.equal(b.cvr);
  });

  it('test delete account', async function () {
    await am.deleteByNumer(a.number!).catch(error => {
      should().not.exist(error, 'error occured');
    });
    const account = await am.getByNumber(a.number!).catch(error => {
      should().not.exist(error, 'error occured');
    });

    expect(account).to.be.undefined;
  });
});
