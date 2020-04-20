import { IMapper } from '../interfaces/IDatabaseMapper';
import { IMovement } from '../interfaces/IMovement';
import { DBConnector } from '../services/DBConnector';

export class MovementMapper implements IMapper<IMovement> {
  getAll?(): Promise<IMovement[]> {
    return new Promise(async (resolve, reject) => {
      const connection = await DBConnector.getConnection();
      connection.query({ sql: 'SELECT * FROM movements' }, (error, results) => {
        connection.release();
        if (error) {
          reject(error);
        }
        resolve(results);
      });
    });
  }

  getById?(id: number): Promise<IMovement> {
    return new Promise(async (resolve, reject) => {
      const connection = await DBConnector.getConnection();
      connection.query({ sql: 'SELECT * FROM movements WHERE id = ?;', values: [id] }, (error, results) => {
        connection.release();
        if (error) {
          reject(error);
        }
        resolve(results[0]);
      });
    });
  }

  getByName?(name: string): Promise<IMovement> {
    throw new Error('Method not implemented.');
  }

  insert(value: IMovement): Promise<void> {
    return new Promise(async (resolve, reject) => {
      const connection = await DBConnector.getConnection();
      connection.query(
        {
          sql: `INSERT INTO movements (${
            value.id !== undefined ? 'id, ' : ''
          }amount, accountFrom, accountTo) VALUES (?, ?, ? ${value.id !== undefined ? ', ?' : ''})`,
          values:
            value.id !== undefined
              ? [value.id, value.amount, value.accountFrom, value.accountTo]
              : [value.amount, value.accountFrom, value.accountTo],
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

  getAllMovementsToAccountNumber(number: number): Promise<IMovement[]> {
    return new Promise(async (resolve, reject) => {
      const connection = await DBConnector.getConnection();
      connection.query(
        { sql: 'SELECT * FROM movements WHERE accountTo=? OR accountFrom=?', values: [number, number] },
        (error, results) => {
          connection.release();
          if (error) {
            reject(error);
          }
          resolve(results);
        },
      );
    });
  }

  insertMany?(values: IMovement[]): Promise<void> {
    throw new Error('Method not implemented.');
  }

  deleteByName?(name: string): Promise<void> {
    throw new Error('Method not implemented.');
  }

  deleteById?(id: number): Promise<void> {
    return new Promise(async (resolve, reject) => {
      const connection = await DBConnector.getConnection();
      connection.query({ sql: 'DELETE FROM movements WHERE id = ?', values: [id] }, error => {
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
      connection.query({ sql: 'DELETE FROM movements' }, error => {
        connection.release();
        if (error) {
          reject(error);
        }
        resolve();
      });
    });
  }
}
