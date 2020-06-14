import Express from 'express';
import bodyParser from 'body-parser';
import colors from 'colors';
import { DBConnector } from './services/DBConnector';
import { SERVER_PORT } from './constants';
import cors from 'cors';

const PORT = SERVER_PORT || 5000;

const app = Express();

if (process.env.ENV !== 'TEST') {
  (async () => {
    await DBConnector.getConnection();
    const dbStatus = await DBConnector.getConnectionState();
    console.log(colors.bgBlack('MYSQL Connection status: ') + dbStatus);
  })();
}

// --- Routes ---
import { MovementRoute } from './routes/MovementRoute';
import { BankRoute } from './routes/BankRoute';
import { AccountRoute } from './routes/AccountRoute';
import { CustomerRoute } from './routes/CustomerRoute';

// let counter = 0;

app.use(bodyParser.json());
app.use(cors());

// app.use((req, res, next) => {
// 	counter++;
// 	console.log('connected: ' + counter );
// 	next();
// })

app.use('/movement', MovementRoute);
app.use('/bank', BankRoute);
app.use('/account', AccountRoute);
app.use('/customer', CustomerRoute);

app.listen(PORT, () => {
  console.log(`
  The server is currently running on
  http://localhost:${PORT}`);
});

export { app as server };
