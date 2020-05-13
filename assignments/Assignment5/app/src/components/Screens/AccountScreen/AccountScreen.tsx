import * as React from 'react';
import { Card } from '../../Card/Card';
import { white, PrimaryOrange, PrimaryLightest, Primary } from '../../../contants';
import { Spinner } from '../../Spinner/Spinner';
import { InputField } from '../../InputField/InputField';
import { DropDown } from '../../DropDown/DropDown';
import { Button } from '../../Button/Button';
import { ICustomer } from '../../../interfaces/ICustomer';
import { CustomerService } from '../../../services/CustomerService';

import './AccountScreen.css';
import { AccountService } from '../../../services/AccountService';

interface IAccountScreenProps {}
interface IAccountScreenState {
  isCreatingAccount: boolean;
  balance: number;
  customers: ICustomer[];
  choosenCustomer: string;
  wantedAccount: number;
  tableData: JSX.Element[];
  name: string;
  customer_cpr: string;
  accountNumber: string;
  isDeletingAccount: boolean;
}

const accountService = new AccountService();
const customerService = new CustomerService();
class AccountScreen extends React.Component<IAccountScreenProps, IAccountScreenState> {
  constructor(props: Readonly<IAccountScreenProps>) {
    super(props);
    this.state = {
      balance: 0,
      choosenCustomer: '',
      wantedAccount: 0,
      customers: [],
      isCreatingAccount: false,
      tableData: [],
      name: '',
      customer_cpr: '',
      isDeletingAccount: false,
      accountNumber: '',
    };
  }

  public async componentWillMount() {
    await this.getData();
  }
  private getData = async () => {
    const accounts = await accountService.getAll();
    const customers = await customerService.getAll();

    this.setState({
      customers,
      tableData: accounts.map((account, index) => {
        return (
          <tr key={index}>
            <td>{account.number}</td>
            <td>{account.customer_cpr}</td>
            <td>{account.balance}</td>
          </tr>
        );
      }),
    });
  };
  private onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === 'balance') return this.setState({ balance: e.target.value as any });
    if (e.target.name === 'name') return this.setState({ name: e.target.value });
    if (e.target.name === 'accountNumber') return this.setState({ accountNumber: e.target.value as any });
  };
  private onCreateAccount = async () => {
    const { balance, choosenCustomer, name } = this.state;

    const customer = this.state.customers.filter(customer => customer.name === choosenCustomer)[0]?.cpr;
    if (!customer) return console.log('enter a valid customer');
    const isCreated = await accountService.create(name, balance, customer as any);
    if (!isCreated) console.log('An Error has occured');
    await this.getData();
    this.setState({ name: '', balance: 0, choosenCustomer: undefined as any });
  };
  private onDeleteAccount = async () => {
    this.setState({ isDeletingAccount: true });
    const isDeleted = await accountService.delete(this.state.accountNumber);
    this.setState({ accountNumber: '' });
    if (!isDeleted) console.log('Something went wrong ');
    await this.getData();
    this.setState({ isDeletingAccount: false });
  };

  public render() {
    return (
      <div className="accountscreen-container">
        <h1 className="center-horizontal">Accounts</h1>
        <div className="accountscreen-card-container center-horizontal">
          <div>
            <Card title="Create a new Account" backgroundColor={white} width={500}>
              {this.state.isCreatingAccount && (
                <div>
                  <Spinner size={40} color={PrimaryOrange} />
                </div>
              )}
              {!this.state.isCreatingAccount && (
                <div className="accountscreen-form-container">
                  <InputField
                    name="name"
                    inputFieldColor={PrimaryLightest}
                    curved={true}
                    value={this.state.name}
                    onChange={e => {
                      this.onChangeHandler(e);
                    }}
                    placeholder="name"
                  />
                  <InputField
                    name="balance"
                    curved={true}
                    isNumbers={true}
                    value={this.state.balance}
                    onChange={e => {
                      this.onChangeHandler(e);
                    }}
                    inputFieldColor={PrimaryLightest}
                    placeholder="Customer Cpr"
                  />
                  <div style={{ marginTop: '5px' }}>
                    <DropDown
                      value={this.state.choosenCustomer}
                      width={120}
                      curved={true}
                      label={'Choose a customer'}
                      elements={this.state.customers.map(customer => customer.name)}
                      onChange={customer => {
                        this.setState({ choosenCustomer: customer });
                      }}
                    />
                  </div>
                  <Button onClick={() => this.onCreateAccount()} label="Create Account" color={PrimaryOrange} />
                </div>
              )}
            </Card>
          </div>
          <div>
            <Card title="Delete a Account" backgroundColor={white} width={500}>
              {this.state.isDeletingAccount && (
                <div>
                  <Spinner size={40} color={PrimaryOrange} />
                </div>
              )}
              {!this.state.isDeletingAccount && (
                <div className="accountscreen-form-container">
                  <InputField
                    name="accountNumber"
                    inputFieldColor={PrimaryLightest}
                    curved={true}
                    isNumbers={true}
                    value={this.state.accountNumber}
                    onChange={e => {
                      this.onChangeHandler(e);
                    }}
                    placeholder="Number of the Account"
                  />
                  <Button onClick={() => this.onDeleteAccount()} label="Delete Account" color={PrimaryOrange} />
                </div>
              )}
            </Card>
          </div>
          <div>
            <Card title="All Accounts" backgroundColor={white} width={500}>
              <div className="table-container">
                <table>
                  <thead style={{ backgroundColor: Primary }}>
                    <tr>
                      <th>Number</th>
                      <th>Customer_Cpr</th>
                      <th>Balance</th>
                    </tr>
                  </thead>
                  <tbody>{this.state.tableData}</tbody>
                </table>
              </div>
            </Card>
          </div>
          <div></div>
        </div>
      </div>
    );
  }
}

export { AccountScreen };
