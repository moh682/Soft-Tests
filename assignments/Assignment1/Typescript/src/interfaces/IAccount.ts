import { ICustomer } from "./ICustomer";

export interface IAccount {
  transferWithAccount(amount: number, target: IAccount);
  transferWithNumber(amount: number, targetNumber: string);
  getBalance(): number;
  getAccountNumber(): string;
  substractBalance(amount: number);
  addBalance(amount: number);
  addMovement(sourceAccount: IAccount, targetAccount: IAccount, amount: number, time: Date);
  getCustomer(): ICustomer;
}