import { ICustomer } from "../interfaces/ICustomer";
import { IAccount } from "../interfaces/IAccount";

export class Customer implements ICustomer {

  private cpr: string;
  private name: string;

  constructor(cpr: string, name: string) {
    this.cpr = cpr;
    this.name = name;
  }

  transfer(amount: number, acount: IAccount, target: ICustomer) {
    throw new Error("Method not implemented.");
  }
}