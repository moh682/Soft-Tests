import * as mocha from 'mocha';
import { expect, should } from 'chai';
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
	const b = { cvr: '12345678', name: 'Rasmus Qviklån' };

	this.beforeAll(function(done) {
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

	it('test insert bank', async function() {
		await bm.insert(b).catch(error => {
			should().not.exist(error, 'error occured');
		});
		const bank: any = await bm.getByCvr(b.cvr).catch(error => {
			should().not.exist(error, 'error occured');
		});

		expect(bank).to.not.be.undefined;
		expect(bank.cvr).to.be.equal(b.cvr);
	});

	it('test get bank', async function() {
		const bank: any = await bm.getByCvr(b.cvr).catch(error => {
			should().not.exist(error, 'error occured');
		});

		expect(bank).to.not.be.undefined;
		expect(bank.cvr).to.be.equal(b.cvr);
	});

	it('test delete bank', async function() {
		await bm.deleteByCvr(b.cvr).catch(error => {
			should().not.exist(error, 'error occured');
		});
		const bank = await bm.getByCvr(b.cvr).catch(error => {
			should().not.exist(error, 'error occured');
		});

		expect(bank).to.be.undefined;
	});
});
