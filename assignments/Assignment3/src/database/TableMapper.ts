import { IMapper } from '../interfaces/IDatabaseMapper';
import { IBank } from '../interfaces/IBank';
import { DBConnector } from '../services/DBConnector';
import { MYSQL_DATABASE } from '../constants';
import colors from 'colors';
import { ITable } from '../interfaces/ITable';
import * as fs from 'fs';

export class TableMapper implements IMapper<ITable> {
	getById?(id: number): Promise<ITable> {
		throw new Error('Method not implemented.');
	}
	getByName?(name: string): Promise<ITable> {
		throw new Error('Method not implemented.');
	}
	insert(table: ITable): Promise<void> {
		return new Promise(async (resolve, reject) => {
			const conn = await DBConnector.getConnection();
			conn.query(
				{
					sql: `SET FOREIGN_KEY_CHECKS = 0; DROP TABLE ${table.TABLE_NAME};`,
				},
				(error, values) => {
					conn.release();
					if (error) {
						Promise.reject();
					}
					return Promise.resolve();
				},
			);
		});
	}

	async insertMany?(tables: ITable[]): Promise<void> {}

	async executeFile(path: string) {
		const conn = await DBConnector.getConnection();
		let queries = fs.readFileSync(path, { encoding: 'utf8' }).split(';');
		queries = queries.map(query => {
			const v = query.replace(/(\r\n|\n|\r);/gm, '').trim();
			return v;
		});
		conn.query(queries.join(';'), (error, value) => {
			conn.release();
			if (error) {
				console.error(error.message);
				return Promise.reject(error);
			}
			Promise.resolve();
		});
	}

	async dropTable(table: string): Promise<void> {
		return new Promise(async (resolve, reject) => {
			const conn = await DBConnector.getConnection();
			conn.query(
				{
					sql: `SET FOREIGN_KEY_CHECKS = 0; drop table ${MYSQL_DATABASE}.${table};`,
				},
				(error, values) => {
					conn.release();
					if (error) {
						console.log(error);
						reject(error);
					}
					resolve();
				},
			);
		});
	}

	async dropAllConstraints(): Promise<void> {
		return new Promise(async (resolve, reject) => {
			const conn = await DBConnector.getConnection();
			conn.query(
				{
					sql: `SELECT concat('alter table ',table_schema,'.',table_name,' DROP FOREIGN KEY ',constraint_name,';')
          FROM information_schema.table_constraints
          WHERE constraint_type='FOREIGN KEY'
          AND table_schema=DATABASE(); `,
				},
				(error, values) => {
					conn.release();
					if (error) {
						reject();
					}
					resolve();
				},
			);
		});
	}

	async dropAll(): Promise<void> {
		return new Promise(async (resolve, reject) => {
			await this.dropAllConstraints();
			const conn = await DBConnector.getConnection();
			conn.query(
				{
					sql: `SET @v = ( select concat( 'drop table ', group_concat(a.table_name))
            from information_schema.tables a 
            where a.table_name like 'dynamic_%'
            AND a.table_schema = DATABASE()
        ;);
        PREPARE s FROM @v; 
        EXECUTE s;`,
				},
				(error, values) => {
					conn.release();
					if (error) {
						reject();
					}
					resolve();
				},
			);
		});
	}

	deleteByName?(name: string): Promise<void> {
		throw new Error('Method not implemented.');
	}
	deleteById?(id: number): Promise<void> {
		throw new Error('Method not implemented.');
	}
	deleteAll?(): Promise<void> {
		throw new Error('Method not implemented.');
	}

	getAll(): Promise<ITable[]> {
		return new Promise(async (resolve, reject) => {
			const conn = await DBConnector.getConnection();
			conn.query(
				{
					sql: `SELECT
      table_name
      FROM
      information_schema.tables
      WHERE
      table_schema = DATABASE();`,
				},
				(error, results) => {
					conn.release();
					if (error) {
						console.error(colors.red('error'), error);
						reject(error);
					}
					resolve(results);
				},
			);
		});
	}
}
