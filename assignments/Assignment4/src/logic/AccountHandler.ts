import { IAccount } from '../interfaces/IAccount';
import { AccountMapper } from '../database/AccountMapper';
import { MovementMapper } from '../database/MovementMapper';

export class AccountHandler {
	async transferAmountTo(currentAccountNumber: number, amount: number, targetAccountNumber: number): Promise<void> {
		// -- Check if target account exist
		// -- Check current account exist

		amount = Math.abs(amount);

		const am = new AccountMapper();
		const mm = new MovementMapper();

		const currentAccount: IAccount = await am.getByNumber(currentAccountNumber);
		const targetAccount: IAccount = await am.getByNumber(targetAccountNumber);

		if (!currentAccount || !targetAccount) throw Error('current account or target account does not exist');
		// -- Accounts exist procceed with transfer

		await Promise.all([
			am.updateAccountBalanceByNumber(currentAccount.number!, currentAccount.balance - amount),
			am.updateAccountBalanceByNumber(targetAccount.number!, targetAccount.balance + amount),
			mm.insert({
				accountFrom: currentAccount.number!,
				accountTo: targetAccount.number!,
				amount,
				time: Date(),
			}),
		]);
	}
}
