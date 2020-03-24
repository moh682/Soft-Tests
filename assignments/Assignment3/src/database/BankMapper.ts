import { IMapper } from '../interfaces/IDatabaseMapper';
import { IBank } from '../interfaces/IBank';
import { DBConnector } from '../services/DBConnector';

export class BankMapper implements IMapper<IBank> {
	getAll?(): Promise<IBank[]> {
		return new Promise(async (resolve, reject) => {
			const connection = await DBConnector.getConnection();
			connection.query({ sql: 'SELECT * FROM banks' }, (error, results) => {
				connection.release();
				if (error) {
					reject(error);
				}
				resolve(results);
			});
		});
	}

	getByCvr(cvr: string): Promise<IBank> {
		return new Promise(async (resolve, reject) => {
			const connection = await DBConnector.getConnection();
			connection.query(
				{
					sql: 'SELECT * FROM banks WHERE cvr=?',
					values: [cvr],
				},
				(error, result) => {
					connection.release();
					if (error) {
						reject(error);
					}
					resolve(result[0]);
				},
			);
		});
	}

	getByName?(name: string): Promise<IBank> {
		throw new Error('Method not implemented.');
	}

	insert(value: IBank): Promise<void> {
		return new Promise(async (resolve, reject) => {
			const connection = await DBConnector.getConnection();
			connection.query(
				{
					sql: 'INSERT INTO banks (cvr, name) VALUES (?, ?)',
					values: [value.cvr, value.name],
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
	insertMany?(values: IBank[]): Promise<void> {
		throw new Error('Method not implemented.');
	}
	deleteByName?(name: string): Promise<void> {
		throw new Error('Method not implemented.');
	}

	deleteByCvr(cvr: string): Promise<void> {
		return new Promise(async (resolve, reject) => {
			const connection = await DBConnector.getConnection();
			connection.query({ sql: 'DELETE FROM banks WHERE cvr=?', values: [cvr] }, error => {
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
			connection.query({ sql: 'DELETE FROM banks' }, error => {
				connection.release();
				if (error) {
					reject(error);
				}
				resolve();
			});
		});
	}
}
