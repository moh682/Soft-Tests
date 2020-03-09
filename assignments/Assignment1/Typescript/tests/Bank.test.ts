import * as mocha from 'mocha';
import { assert, expect } from 'chai';
import { mock, instance, } from 'ts-mockito';
import { IBank } from '../src/interfaces/IBank';
import { Bank } from '../src/components/Bank';
import { Account } from '../src/components/Account';
import { Customer } from '../src/components/Customer';

// describe('tests for Bank interface', function () {

//   it("test getAccounts function", function () {

//     const bankInstance: Bank = instance(mock(Bank));
//     const account: Account = instance(mock(Account));
//     const customer: Customer = instance(mock(Customer));
//     account.setCustomer(customer);

//     bankInstance.setAccount(account);
//     bankInstance.setAccount(account);
//     bankInstance.setAccount(account);
//     bankInstance.setAccount(account);
//     bankInstance.setAccount(account);

//     expect(bankInstance.getAccounts(account.getCustomer()).length).to.be.equal(5);

//   })
// })