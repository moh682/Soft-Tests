import * as mocha from 'mocha';
import { expect, Assertion, should } from 'chai';
import colors from 'colors';
import { TableMapper } from '../../src/database/TableMapper';

describe('Test Bank', function() {
	const tm = new TableMapper();

	this.timeout(5000);

	it('test drop down of database', async function() {
		const before = await tm.getAll();
		expect(before).to.not.be.empty;
		// -- Its important to drop in this order because of foreign keys
		await tm.dropAllConstraints();
		await tm.dropTable('customers').catch(error => console.error(colors.red('customers'), error));
		await tm.dropTable('banks').catch(error => console.error(colors.red('banks'), error));
		await tm.dropTable('movements').catch(error => console.error(colors.red('movements'), error));
		await tm.dropTable('accounts').catch(error => console.error(colors.red('accounts'), error));

		const after = await tm.getAll();
		expect(after).to.be.empty;
	});

	it('test insertion of sql file', function(done) {
		const before = tm
			.getAll()
			.then(value => {
				expect(before).to.be.empty;
				tm.executeFile(__dirname + '/../../sql.sql').then(() => {
					this.timeout(10000);
					setTimeout(async () => {
						await tm.getAll().then(after => {
							expect(after.length).to.be.equal(4);
							done();
						});
					}, 1000);
				});
			})
			.catch(error => console.error(error));
	});
});
