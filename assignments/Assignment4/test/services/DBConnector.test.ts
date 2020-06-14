import * as mocha from 'mocha';
import { expect } from 'chai';
import { DBConnector } from '../../src/services/DBConnector';
import * as s from '../database/AccountMapper.test';

describe('Database connection Test', function() {
	it('test login to database', async function() {
		const connection = await DBConnector.getConnection();
		expect(connection.state === 'authenticated', 'Connection is not Authenticated');
	});
});
