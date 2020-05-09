const env = require('dotenv').config().parsed;

export const MYSQL_USERNAME = env?.MYSQL_USERNAME || process.env.MYSQL_USERNAME;
export const MYSQL_PASSWORD = env?.MYSQL_PASSWORD || process.env.MYSQL_PASSWORD;
let SERVER_PORT = env?.SERVER_PORT || process.env.SERVER_PORT;
export const MYSQL_DATABASE = env?.MYSQL_DATABASE || process.env.MYSQL_DATABASE;

if (process.env.ENV === 'TEST') {
  SERVER_PORT = 4000;
}

export { SERVER_PORT };
