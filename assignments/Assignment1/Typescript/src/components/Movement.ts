import { IMovement } from "../interfaces/IMovement";
import { IAccount } from "../interfaces/IAccount";

export class Movement implements IMovement {
  private time: Date;
  private amount: number;

  private source: IAccount;
  private target: IAccount;

  constructor(time: Date, amount: number, sourceAccount: IAccount, targetAccount: IAccount) {
    this.time = time;
    this.amount = amount;
    this.source = sourceAccount;
    this.target = targetAccount;
  }

  public getTime() {
    return this.time;
  }

  public getAmount() {
    return this.amount;
  }

  public getSourceAccount() {
    return this.source;
  }

  public getTargetAccount() {
    return this.target;
  }
}