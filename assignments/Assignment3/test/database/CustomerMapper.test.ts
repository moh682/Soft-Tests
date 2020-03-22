import * as mocha from 'mocha';
import { expect } from 'chai';
import { BankMapper } from '../../src/database/BankMapper';
import { CustomerMapper } from '../../src/database/CustomerMapper';
import { MovementMapper } from '../../src/database/MovementMapper';
import { AccountMapper } from '../../src/database/AccountMapper';
import { ICustomer } from '../../src/interfaces/ICustomer';
import { IBank } from '../../src/interfaces/IBank';

describe('Test customer', function() {
	const bm = new BankMapper();
	const cm = new CustomerMapper();
	const mm = new MovementMapper();
	const am = new AccountMapper();
	const b: IBank = { cvr: '12345678', name: 'Nordea' };
	const c: ICustomer = { bank_cvr: b.cvr, cpr: '050196-2132', name: 'Mohammad hariri' };
	this.beforeAll(function(done) {
		mm.deleteAll().finally(() => {
			am.deleteAll().finally(() => {
				cm.deleteAll().finally(() => {
					bm.deleteAll().finally(() => done());
				});
			});
		});
	});

	it('test insert customer', async function() {
		await bm.insert(b);
		await cm.insert(c);
		const customer = await cm.getByNumber(c.cpr);

		expect(customer).to.not.be.undefined;
		expect(customer.bank_cvr).to.be.equal(b.cvr);
	});

	it('test get customer', async function() {
		const customer = await cm.getByNumber(c.cpr);

		expect(customer).to.not.be.undefined;
		expect(customer.cpr).to.be.equal(c.cpr);
	});

	it('test delete customer', async function() {
		await cm.deleteByNumber(c.cpr);
		const customer = await cm.getByNumber(c.cpr);

		expect(customer).to.be.undefined;
	});
});
