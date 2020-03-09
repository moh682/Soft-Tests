import { IAccount } from "./IAccount";

export interface ICustomer {
  transfer(amount: number, acount: IAccount, target: ICustomer);
}