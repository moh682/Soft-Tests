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
		await tm.dropAll();
		const after = await tm.getAll();
		expect(after).to.be.empty;
	});

	it('test insertion of sql file', function(done) {
		const before = tm
			.getAll()
			.then(value => {
				expect(before).to.be.empty;
				tm.executeFile(__dirname + '/../../sql.sql').then(() => {
					// -- It takes time to create the tables so i wait for sql to finish to execute the next query
					this.timeout(10000);
					setTimeout(async () => {
						await tm.getAll().then(after => {
							expect(after.length).to.be.equal(4);
							done();
						});
					}, 30);
				});
			})
			.catch(error => console.error(error));
	});
});
