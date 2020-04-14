import { IMapper } from '../interfaces/IDatabaseMapper';
import { IAccount } from '../interfaces/IAccount';
import { DBConnector } from '../services/DBConnector';

export class AccountMapper implements IMapper<IAccount> {
	getAll(): Promise<IAccount[]> {
		return new Promise(async (resolve, reject) => {
			const connection = await DBConnector.getConnection();
			connection.query({ sql: 'SELECT * FROM accounts' }, (error, results) => {
				connection.release();
				if (error) {
					reject(error);
				}
				resolve(results);
			});
		});
	}

	getByNumber(number: number): Promise<IAccount> {
		return new Promise(async (resolve, reject) => {
			const connection = await DBConnector.getConnection();
			connection.query({ sql: 'SELECT * FROM accounts WHERE number=?', values: [number] }, (error, results) => {
				connection.release();
				if (error) {
					reject(error);
				}
				resolve(results[0]);
			});
		});
	}

	updateAccountBalanceByNumber(number: number, balance: number): Promise<void> {
		return new Promise(async (resolve, reject) => {
			const connection = await DBConnector.getConnection();
			connection.query(
				{
					sql: `UPDATE accounts SET balance=? WHERE number=?`,
					values: [balance, number],
				},
				(error, result) => {
					connection.release();
					if (error) {
						reject(error);
					}
					resolve();
				},
			);
		});
	}

	getByName?(name: string): Promise<IAccount> {
		throw new Error('Method not implemented.');
	}

	insert(value: IAccount): Promise<void> {
		return new Promise(async (resolve, reject) => {
			const connection = await DBConnector.getConnection();
			connection.query(
				{
					sql: `INSERT INTO accounts ( balance, customer_cpr, bank_cvr ${
						value.number !== undefined ? ', number' : ''
					}) VALUES (?, ?, ?${value.number !== undefined ? ', ?' : ''})`,
					values:
						value.number !== undefined
							? [value.balance, value.customer_cpr, value.bank_cvr, value.number]
							: [value.balance, value.customer_cpr, value.bank_cvr, value.number],
				},
				(error, result) => {
					connection.release();
					if (error) {
						reject(error);
					}
					resolve();
				},
			);
		});
	}

	insertMany?(values: IAccount[]): Promise<void> {
		throw new Error('Method not implemented.');
	}

	deleteByName(name: string): Promise<void> {
		throw new Error('Method not implemented.');
	}

	deleteByNumer(number: number): Promise<void> {
		return new Promise(async (resolve, reject) => {
			const connection = await DBConnector.getConnection();
			connection.query({ sql: 'DELETE FROM accounts WHERE number = ? ', values: [number] }, error => {
				connection.release();
				if (error) {
					reject(error);
				}
				resolve();
			});
		});
	}

	deleteAll(): Promise<void> {
		return new Promise(async (resolve, reject) => {
			const connection = await DBConnector.getConnection();
			connection.query({ sql: 'DELETE FROM accounts' }, error => {
				connection.release();
				if (error) {
					reject(error);
				}
				resolve();
			});
		});
	}
}
