import { IAccount } from "../interfaces/IAccount";
import { IBank } from "../interfaces/IBank";
import { ICustomer } from "../interfaces/ICustomer";
import { IMovement } from "../interfaces/IMovement";
import { Movement } from "./Movement";

export class Account implements IAccount {

  private accountNumber: string; // ? Required in the assignment
  private bank: IBank;
  private customer: ICustomer;
  private balance: number;
  private movements: IMovement[];

  constructor(bank: IBank, customer: ICustomer, accountNumber: string | undefined) {
    this.accountNumber = accountNumber || "";
    this.customer = customer;
    this.bank = bank;
    this.movements = [];
    this.balance = 0;
    bank.setAccount(this);
  }

  public transferWithAccount(amount: number, target: IAccount) {
    if (amount <= 0) throw new Error("Amount is below or equal 0");
    const account = this.bank.getAccount(target.getAccountNumber());
    if (!account) throw new Error("Account does not exist");

    // ? Logging movement
    this.addMovement(this, account, -amount, new Date);
    account.addMovement(account, this, amount, new Date);

    this.substractBalance(amount);
    account.addBalance(amount);
  }

  public transferWithNumber(amount: number, targetNumber: string) {
    if (amount <= 0) throw new Error("Amount is below or equal 0");
    const account = this.bank.getAccount(targetNumber);
    if (!account) throw new Error("Account does not exist");

    // ? Logging movement
    this.addMovement(this, account, -amount, new Date);
    account.addMovement(account, this, amount, new Date);

    this.substractBalance(amount);
    account.addBalance(amount);
  }

  public getMovements() {
    return this.movements;
  }

  public setCustomer(customer: ICustomer) {
    this.customer = customer;
  }

  public addMovement(sourceAccount: IAccount, targetAccount: IAccount, amount: number, time: Date) {
    this.movements.push(new Movement(time, amount, sourceAccount, targetAccount));
  }

  // private monitorMovement(targetAccountNumber: string, amount: number, isRecieving: boolean) {
  //   const obj = {
  //     targetAccount: targetAccountNumber,
  //     amount,
  //     isRecieving
  //   }
  //   if (isRecieving) {
  //     this.movements.push(obj);
  //   }

  // }

  public getBank() {
    return this.bank;
  }

  public getCustomer() {
    return this.customer;
  }

  public getAccountNumber() {
    return this.accountNumber;
  }

  public getBalance(): number {
    return this.balance;
  }

  public addBalance(amount: number) {
    this.balance += amount;
  }

  public substractBalance(amount: number) {
    this.balance -= amount;
  }
}