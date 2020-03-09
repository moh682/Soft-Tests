import * as mocha from 'mocha';
import { assert, expect } from 'chai';
import { mock, instance } from 'ts-mockito'
import { Bank } from '../src/components/Bank';
import { Customer } from '../src/components/Customer';
import { Account } from '../src/components/Account';

/**
 * ----------------------------------------------------------------------------------------------------------------------------------------------------------------
 * -- All the test are taken from https://github.com/datsoftlyngby/soft2020spring-test/blob/master/banking/src/test/java/dk/cphbusiness/banking/AccountTest.java --
 * ----------------------------------------------------------------------------------------------------------------------------------------------------------------
 */

describe("Tests for Account class", function () {

  it("test creation of Account", function () {
    const bank = new Bank("1231982371", "First Bank");
    const customer = new Customer("12312321-2123", "moe apple");
    const str = undefined;
    const account = new Account(bank, customer, str);
    expect(account).to.not.be.null;
  })

  it("test Creation of Account with bank", function () {
    const bank = new Bank("1231982371", "First Bank");
    const customer = new Customer("12312321-2123", "moe apple");
    const str = undefined;
    const account = new Account(bank, customer, str);
    assert(bank === account.getBank(), "Bank is not equal to the bank inside account");
    expect(account.getBank()).to.not.be.null;
    expect(account.getBank()).to.not.be.undefined;
  });

  it('test Creation of Account with number', function () {
    const bank = new Bank("1231982371", "First Bank");
    const customer = new Customer("12312321-2123", "moe apple");
    const number = "ABC123123";
    const account = new Account(bank, customer, number);
    assert(number === account.getAccountNumber(), 'Number of account is not the same');
    expect(account.getAccountNumber()).to.not.be.null;
    expect(account.getAccountNumber()).to.not.be.undefined;
  })

  it("Test Creation of Account with zero balance", function () {
    const bank = new Bank("1231982371", "First Bank");
    const customer = new Customer("12312321-2123", "moe apple");
    const number = "ABC123123";
    const account = new Account(bank, customer, number);
    assert(0 === account.getBalance(), 'Balance is not 0');
  })

  it("Test Transfer with positive amount", function () {
    const bank = new Bank("1231982371", "First Bank");
    const customer = new Customer("12312321-2123", "moe apple");
    const sourceAccount = new Account(bank, customer, "ABC123123");
    const targetAccount = new Account(bank, customer, "TRX986786");

    bank.setAccount(targetAccount);
    sourceAccount.transferWithAccount(10000, targetAccount);
    assert(-10000 === sourceAccount.getBalance(), "transfer was not succesfull");
    assert(10000 === targetAccount.getBalance(), "transfer was not succesfull");
  })

  it("Test Transfer Positive Amount using Number", function () {
    const bank = new Bank("1231982371", "First Bank");
    const customer = new Customer("12312321-2123", "moe apple");
    const targetAccountNumber = "TRX986786";
    const targetAccount = new Account(bank, customer, targetAccountNumber);
    const sourceAccount = new Account(bank, customer, "ABC123123");

    bank.setAccount(targetAccount);
    sourceAccount.transferWithNumber(10000, targetAccountNumber);
    assert(10000 === targetAccount.getBalance(), "transfer was not succesfull");
    assert(-10000 === sourceAccount.getBalance(), "transfer was not succesfull");
    assert(10000 === targetAccount.getBalance(), "transfer was not succesfull");
  })


  // ------------------------------------------------------------------------------------------------------------
  // ----------------------------------------------- Own tests --------------------------------------------------
  // ------------------------------------------------------------------------------------------------------------

  it("Test movement records when transfering money", function () {
    const bank = new Bank("1231982371", "First Bank");
    const customer = new Customer("12312321-2123", "moe apple");
    const targetAccountNumber = "TRX986786";
    const targetAccount = new Account(bank, customer, targetAccountNumber);
    const sourceAccount = new Account(bank, customer, "ABC123123");
    bank.setAccount(targetAccount);

    sourceAccount.transferWithAccount(1000, targetAccount);

    const targetMovement = targetAccount.getMovements();
    const sourceMovement = sourceAccount.getMovements();

    expect(targetMovement, "targetMovement is empty").to.not.be.empty;
    expect(sourceMovement, "sourceMovement is empty").to.not.be.empty;

    expect(sourceMovement[0].getAmount()).to.be.equal(-1000);
    expect(targetMovement[0].getAmount()).to.be.equal(1000);
  })

  it("Test getAccounts function getAccount", function () {

    const bank = new Bank("1231982371", "First Bank");
    const customer = new Customer("12312321-2123", "moe apple");
    const targetAccountNumber = "TRX986786";
    const targetAccount = new Account(bank, customer, targetAccountNumber);
    const sourceAccount = new Account(bank, customer, "ABC123123");

    expect(bank.getAccounts(customer)).to.not.be.empty;
    expect(bank.getAccounts(customer).length).to.be.equal(2);

    expect(bank.getAccounts(customer)[0].getCustomer().getCpr())
      .to.be.equal(customer.getCpr());
    expect(bank.getAccounts(customer)[1].getCustomer().getCpr())
      .to.be.equal(customer.getCpr());
  })

  it("Test getAccount function getAccount", function () {

    const bank = new Bank("1231982371", "First Bank");
    const customer = new Customer("12312321-2123", "moe apple");
    const targetAccountNumber = "TRX986786";
    const targetAccount = new Account(bank, customer, targetAccountNumber);
    const sourceAccount = new Account(bank, customer, "ABC123123");

    expect(bank.getAccount(targetAccount.getAccountNumber())).to.not.be.undefined;
    expect(bank.getAccount(sourceAccount.getAccountNumber())).to.not.be.undefined;
  });

});