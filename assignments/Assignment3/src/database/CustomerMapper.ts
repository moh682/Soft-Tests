import { IMapper } from '../interfaces/IDatabaseMapper';
import { ICustomer } from '../interfaces/ICustomer';
import { DBConnector } from '../services/DBConnector';

export class CustomerMapper implements IMapper<ICustomer> {
	getAll?(): Promise<ICustomer[]> {
		return new Promise(async (resolve, reject) => {
			const connection = await DBConnector.getConnection();
			connection.query({ sql: 'SELECT * FROM customers' }, (error, results) => {
				connection.release();
				if (error) {
					console.error(error);
					reject(error);
				}
				resolve(results);
			});
		});
	}

	getByNumber(number: string): Promise<ICustomer> {
		return new Promise(async (resolve, reject) => {
			const connection = await DBConnector.getConnection();
			connection.query(
				{
					sql: 'SELECT * FROM customers where cpr = ?',
					values: [number],
				},
				(error, result) => {
					connection.release();
					if (error) {
						console.error(error);
						reject(error);
					}
					resolve(result[0]);
				},
			);
		});
	}

	getByName?(name: string): Promise<ICustomer> {
		throw new Error('Method not implemented.');
	}

	insert(value: ICustomer): Promise<void> {
		return new Promise(async (resolve, reject) => {
			const connection = await DBConnector.getConnection();
			connection.query(
				{
					sql: 'INSERT INTO customers (cpr, name, bank_cvr) VALUES (?, ?, ?)',
					values: [value.cpr, value.name, value.bank_cvr],
				},
				(error, result) => {
					connection.release();
					if (error) {
						console.error(error);
						reject(error);
					}
					resolve();
				},
			);
		});
	}

	insertMany?(values: ICustomer[]): Promise<void> {
		throw new Error('Method not implemented.');
	}

	deleteByName?(name: string): Promise<void> {
		throw new Error('Method not implemented.');
	}

	deleteByNumber(cpr: string): Promise<void> {
		return new Promise(async (resolve, reject) => {
			const connection = await DBConnector.getConnection();
			connection.query({ sql: 'DELETE FROM customers where cpr = ?', values: [cpr] }, error => {
				connection.release();
				if (error) {
					console.error(error);
					reject(error);
				}
				resolve();
			});
		});
	}

	deleteAll(): Promise<void> {
		return new Promise(async (resolve, reject) => {
			const connection = await DBConnector.getConnection();
			connection.query({ sql: 'DELETE FROM customers' }, error => {
				connection.release();
				if (error) {
					console.error(error);
					reject(error);
				}
				resolve();
			});
		});
	}
}
