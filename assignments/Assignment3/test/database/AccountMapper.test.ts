import * as mocha from 'mocha';
import { expect } from 'chai';
import { BankMapper } from '../../src/database/BankMapper';
import { CustomerMapper } from '../../src/database/CustomerMapper';
import { MovementMapper } from '../../src/database/MovementMapper';
import { AccountMapper } from '../../src/database/AccountMapper';
import { ICustomer } from '../../src/interfaces/ICustomer';
import { IAccount } from '../../src/interfaces/IAccount';

describe('Test Account', function() {
	const bm = new BankMapper();
	const cm = new CustomerMapper();
	const mm = new MovementMapper();
	const am = new AccountMapper();
	const b = { cvr: '12345678', name: 'Nordea' };
	const c: ICustomer = { bank_cvr: b.cvr, cpr: '050196-2132', name: 'Mohammad hariri' };
	const a: IAccount = { balance: 1000, bank_cvr: b.cvr, customer_cpr: c.cpr, number: 1 };

	this.beforeAll(function(done) {
		mm.deleteAll().finally(() => {
			am.deleteAll().finally(() => {
				cm.deleteAll().finally(() => {
					bm.deleteAll().finally(() => done());
				});
			});
		});
	});

	it('test insert account', async function() {
		await bm.insert(b);
		await cm.insert(c);
		await am.insert(a);

		const account = await am.getAll();

		expect(account).to.not.be.empty;
		expect(account.length).to.be.equal(1);
	});

	it('test get account', async function() {
		const accounts = await am.getByNumber(a.number!);

		expect(accounts).to.not.be.undefined;
		expect(accounts.bank_cvr).to.be.equal(b.cvr);
	});

	it('test delete account', async function() {
		await am.deleteByNumer(a.number!);
		const account = await am.getByNumber(a.number!);

		expect(account).to.be.undefined;
	});
});
