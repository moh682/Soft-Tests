import * as mocha from 'mocha';
import { expect } from 'chai';
import { AccountHandler } from '../../src/logic/AccountHandler';
import { AccountMapper } from '../../src/database/AccountMapper';
import { MovementMapper } from '../../src/database/MovementMapper';
import { CustomerMapper } from '../../src/database/CustomerMapper';
import { BankMapper } from '../../src/database/BankMapper';
import { IBank } from '../../src/interfaces/IBank';
import { ICustomer } from '../../src/interfaces/ICustomer';
import { IAccount } from '../../src/interfaces/IAccount';

describe('Test AccountHandler logic', function() {
	const ah = new AccountHandler();
	const am = new AccountMapper();
	const mm = new MovementMapper();
	const cm = new CustomerMapper();
	const bm = new BankMapper();

	const bank: IBank = {
		cvr: '12345678',
		name: 'Nordea',
	};
	const customer: ICustomer = {
		bank_cvr: bank.cvr,
		cpr: '12345678',
		name: 'Mohammad',
	};
	const currentAccount: IAccount = {
		balance: 1000,
		bank_cvr: bank.cvr,
		customer_cpr: customer.cpr,
		number: 1,
	};
	const targetAccount: IAccount = {
		balance: 1000,
		bank_cvr: bank.cvr,
		customer_cpr: customer.cpr,
		number: 2,
	};

	// ! The pyramid of shit :) I know - do something about it
	this.beforeAll(function(done) {
		mm.deleteAll().finally(() => {
			am.deleteAll().finally(() => {
				cm.deleteAll().finally(() => {
					bm.deleteAll().finally(async () => {
						await Promise.all([
							await bm.insert(bank),
							await cm.insert(customer),
							await am.insert(currentAccount),
							await am.insert(targetAccount),
						]).finally(() => {
							done();
						});
					});
				});
			});
		});
	});

	it('tranfer to money to account', async function() {
		await ah.transferAmountTo(currentAccount.number!, 400, targetAccount.number!);
		await ah.transferAmountTo(targetAccount.number!, 100, currentAccount.number!);

		const currentAccountAfterTransaction = await am.getByNumber(currentAccount.number!);
		const targetAccountAfterTransaction = await am.getByNumber(targetAccount.number!);

		expect(currentAccountAfterTransaction.balance).to.not.be.undefined;
		expect(currentAccountAfterTransaction.balance).to.be.equal(700);

		expect(targetAccountAfterTransaction.balance).to.not.be.undefined;
		expect(targetAccountAfterTransaction.balance).to.be.equal(1300);
	});

	it('Get all movements for one account', async function() {
		await ah.transferAmountTo(currentAccount.number!, 400, targetAccount.number!);
		await ah.transferAmountTo(targetAccount.number!, 100, currentAccount.number!);

		const allMovements = await mm.getAllMovementsToAccountNumber(currentAccount.number!);

		expect(allMovements).to.not.be.empty;
		expect(allMovements.length).to.be.equal(4); // -- Because of 4 seperate transactions with the test above
	});
});
