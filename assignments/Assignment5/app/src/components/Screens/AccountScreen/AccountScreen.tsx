import * as React from 'react';
import { Card } from '../../Card/Card';
import { white, PrimaryOrange, PrimaryLightest, Primary } from '../../../contants';
import { Spinner } from '../../Spinner/Spinner';
import { InputField } from '../../InputField/InputField';
import { DropDown } from '../../DropDown/DropDown';
import { Button } from '../../Button/Button';
import { ICustomer } from '../../../interfaces/ICustomer';
import { CustomerService } from '../../../services/CustomerService';

interface IAccountScreenProps {}
interface IAccountScreenState {
  isCreatingAccount: boolean;
  balance: number;
  customers: ICustomer[];
}

const customerService = new CustomerService();
class AccountScreen extends React.Component<IAccountScreenProps, IAccountScreenState> {
  constructor(props: Readonly<IAccountScreenProps>) {
    super(props);
    this.state = {};
  }

  public async componentWillMount() {
    await this.getData();
  }
  private getData = async () => {
    Promise.all([bankService.getAll(), customerService.getAll()]).then(res => {
      const banks = res[0];
      const customers = res[1];
      this.setState({
        banks: banks,
        tableData: customers.map((customer, index) => (
          <tr key={index}>
            <td>{customer.name}</td>
            <td>{customer.cpr}</td>
            <td>
              {banks.map(v => {
                if (v.cvr === customer.bank_cvr) {
                  return v.name;
                }
              })}
            </td>
          </tr>
        )),
      });
    });
  };
  private onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.name === 'name') this.setState({ name: e.currentTarget.value });
    if (e.currentTarget.name === 'cpr') this.setState({ cpr: e.currentTarget.value });
    if (e.currentTarget.name === 'wantedCpr') this.setState({ wantedCpr: e.currentTarget.value });
  };
  private onCreateCustomer = async () => {
    this.setState({ isCreatingCustomer: true, name: '', cpr: '', wantedBank: 'Choose a bank' });
    const { name, cpr, wantedBank } = this.state;
    const bank = this.state.banks.filter(b => b.name === wantedBank)[0];
    const isCreated = await customerService.create(name, cpr, bank.cvr);
    if (!isCreated) alert('An error has occured');
    this.setState({ isCreatingCustomer: true });
  };
  private onDeleteBank = async () => {
    this.setState({ isDeletingCustomer: true });
  };

  public render() {
    return (
      <div className="customerscreen-container">
        <h1 className="center-horizontal">Customer</h1>
        <div className="customerscreen-card-container center-horizontal">
          <div>
            <Card title="Create a new Customer" backgroundColor={white} width={500}>
              {this.state.isCreatingCustomer && (
                <div>
                  <Spinner size={40} color={PrimaryOrange} />
                </div>
              )}
              {!this.state.isCreatingCustomer && (
                <div className="customerscreen-form-container">
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
                    name="cpr"
                    curved={true}
                    value={this.state.cpr}
                    onChange={e => {
                      this.onChangeHandler(e);
                    }}
                    inputFieldColor={PrimaryLightest}
                    placeholder="cpr"
                  />
                  <div style={{ marginTop: '5px' }}>
                    <DropDown
                      width={120}
                      curved={true}
                      label={this.state.wantedBank}
                      elements={this.state.banks.map(bank => bank.name)}
                      onChange={cvr => {
                        this.setState({ wantedBank: cvr });
                      }}
                    />
                  </div>
                  <Button onClick={() => this.onCreateCustomer()} label="Create Customer" color={PrimaryOrange} />
                </div>
              )}
            </Card>
          </div>
          <div>
            <Card title="Delete a Customer" backgroundColor={white} width={500}>
              {this.state.isCreatingCustomer && (
                <div>
                  <Spinner size={40} color={PrimaryOrange} />
                </div>
              )}
              {!this.state.isCreatingCustomer && (
                <div className="customerscreen-form-container">
                  <InputField
                    name="wantedCpr"
                    inputFieldColor={PrimaryLightest}
                    curved={true}
                    value={this.state.wantedCpr}
                    onChange={e => {
                      this.onChangeHandler(e);
                    }}
                    placeholder="cpr of the Customer"
                  />
                  <Button onClick={() => this.onDeleteBank()} label="Delete Customer" color={PrimaryOrange} />
                </div>
              )}
            </Card>
          </div>
          <div>
            <Card title="All Customers" backgroundColor={white} width={500}>
              <div className="table-container">
                <table>
                  <thead style={{ backgroundColor: Primary }}>
                    <tr>
                      <th>Name</th>
                      <th>Cpr</th>
                      <th>bank</th>
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
