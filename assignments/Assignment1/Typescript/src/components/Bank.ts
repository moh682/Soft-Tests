import { IBank } from "../interfaces/IBank";
import { ICustomer } from "../interfaces/ICustomer";
import { IAccount } from "../interfaces/IAccount";

export class Bank implements IBank {

  private cvr: string;
  private name: string;
  private accounts: IAccount[];
  private customers: ICustomer[];

  constructor(cvr: string, name: string) {
    this.cvr = cvr;
    this.name = name;
    this.accounts = [];
    this.customers = [];
  }

  // ? Returns account that have specific account number;
  public getAccount(accountNumber: string): IAccount {
    return this.accounts.filter(account => account.getAccountNumber() === accountNumber)[0];
  }

  // ? Returns all accounts for a customer
  public getAccounts(customer: ICustomer): IAccount[] {
    return this.accounts.filter(account => account.getCustomer().getCpr() === customer.getCpr());
  }

  public setAccount(account: IAccount) {
    this.accounts.push(account);
  }

  public setCustomer(customer: ICustomer) {
    this.customers.push(customer);
  }

  public getCvr() {
    return this.cvr;
  }
}