import * as mocha from 'mocha';
import { expect, should } from 'chai';
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
	const b: IBank = { cvr: '12345678', name: 'Rasmus Qviklån' };
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
		await bm.insert(b).catch(error => {
			should().not.exist(error, 'error occured');
		});
		await cm.insert(c).catch(error => {
			should().not.exist(error, 'error occured');
		});
		const customer: ICustomer = await cm.getByNumber(c.cpr).catch(error => {
			should().not.exist(error, 'error occured');
			return {} as ICustomer;
		});

		expect(customer).to.not.be.undefined;
		expect(customer.bank_cvr).to.be.equal(b.cvr);
	});

	it('test get customer', async function() {
		const customer = await cm.getByNumber(c.cpr).catch(error => {
			should().not.exist(error, 'error occured');
			return {} as ICustomer;
		});

		expect(customer).to.not.be.undefined;
		expect(customer.cpr).to.be.equal(c.cpr);
	});

	it('test delete customer', async function() {
		await cm.deleteByNumber(c.cpr).catch(error => {
			should().not.exist(error, 'error occured');
		});
		const customer = await cm.getByNumber(c.cpr).catch(error => {
			should().not.exist(error, 'error occured');
			return {} as ICustomer;
		});

		expect(customer).to.be.undefined;
	});
});
