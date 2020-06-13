import { createPool, Pool, PoolConnection } from 'mysql';
import { MYSQL_PASSWORD, MYSQL_USERNAME, MYSQL_DATABASE } from '../constants';

let connectionPool: Pool;
export class DBConnector {
  public constructor() {}

  public static getConnectionState = async (): Promise<string> => {
    return new Promise(resolve => {
      return connectionPool.getConnection((error, connection) => {
        if (!error) resolve(connection.state);
      });
    });
  };

  public static getConnection = async (): Promise<PoolConnection> => {
    if (!connectionPool) {
      connectionPool = createPool({
        connectionLimit: 20,
        user: MYSQL_USERNAME,
        password: MYSQL_PASSWORD,
        database: MYSQL_DATABASE,
        multipleStatements: true,
      });
    }
    return new Promise(resolve => {
      connectionPool.getConnection((error, connection) => {
        if (error) console.error(error);
        resolve(connection);
      });
    });
  };
}
