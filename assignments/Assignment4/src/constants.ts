const env = require('dotenv').config().parsed;

let MYSQL_USERNAME = env?.MYSQL_USERNAME || process.env.MYSQL_USERNAME;
let MYSQL_PASSWORD = env?.MYSQL_PASSWORD || process.env.MYSQL_PASSWORD;
let SERVER_PORT = env?.SERVER_PORT || process.env.SERVER_PORT;
let MYSQL_DATABASE = env?.MYSQL_DATABASE || process.env.MYSQL_DATABASE;

if (process.env.ENV === 'TEST') {
	SERVER_PORT = 4000;
	MYSQL_USERNAME = process.env.TEST_MYSQL_USERNAME;
	MYSQL_PASSWORD = process.env.TEST_MYSQL_PASSWORD;
	MYSQL_DATABASE = process.env.DATABASE
}

export { SERVER_PORT, MYSQL_PASSWORD, MYSQL_USERNAME, MYSQL_DATABASE };
