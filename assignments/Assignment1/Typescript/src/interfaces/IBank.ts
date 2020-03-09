import { IAccount } from "./IAccount";
import { ICustomer } from "./ICustomer";

export interface IBank {
  getAccount(numberId: string): IAccount;
  getAccounts(customer: ICustomer): IAccount[];
}