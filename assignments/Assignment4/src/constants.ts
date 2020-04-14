const env = require('dotenv').config().parsed;

export const MYSQL_USERNAME = env?.MYSQL_USERNAME || process.env.MYSQL_USERNAME;
export const MYSQL_PASSWORD = env?.MYSQL_PASSWORD || process.env.MYSQL_PASSWORD;
export const MYSQL_DATABASE = env?.MYSQL_DATABASE || process.env.MYSQL_DATABASE;
