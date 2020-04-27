import Express from 'express';
import bodyParser from 'body-parser';
import colors from 'colors';
import { DBConnector } from './services/DBConnector';

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

app.use(bodyParser.json());

app.use('/movement', MovementRoute);
app.use('/bank', BankRoute);
app.use('/account', AccountRoute);
app.use('/customer', CustomerRoute);

app.listen(3000, () => {
  console.log(`
  The server is currently running on
  http://localhost:3000`);
});

export { app as server };
