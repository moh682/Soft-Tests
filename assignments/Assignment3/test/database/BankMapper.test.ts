import * as mocha from 'mocha';
import { expect } from 'chai';
import { BankMapper } from '../../src/database/BankMapper';
import { CustomerMapper } from '../../src/database/CustomerMapper';
import { MovementMapper } from '../../src/database/MovementMapper';
import { AccountMapper } from '../../src/database/AccountMapper';

describe('Test Bank', function() {
	this.timeout(5000);

	const bm = new BankMapper();
	const cm = new CustomerMapper();
	const mm = new MovementMapper();
	const am = new AccountMapper();
	const b = { cvr: '12345678', name: 'Nordea' };

	this.beforeAll(function(done) {
		mm.deleteAll().finally(() => {
			am.deleteAll().finally(() => {
				cm.deleteAll().finally(() => {
					bm.deleteAll().finally(() => {
						done();
					});
				});
			});
		});
	});

	it('test insert bank', async function() {
		await bm.insert(b);
		const bank = await bm.getByCvr(b.cvr);

		expect(bank).to.not.be.undefined;
		expect(bank.cvr).to.be.equal(b.cvr);
	});

	it('test get bank', async function() {
		const bank = await bm.getByCvr(b.cvr);

		expect(bank).to.not.be.undefined;
		expect(bank.cvr).to.be.equal(b.cvr);
	});

	it('test delete bank', async function() {
		await bm.deleteByCvr(b.cvr);
		const bank = await bm.getByCvr(b.cvr);

		expect(bank).to.be.undefined;
	});
});
