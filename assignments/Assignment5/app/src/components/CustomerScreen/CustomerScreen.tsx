import * as React from 'react';
import { Card } from '../Card/Card';
import { white, PrimaryLightest, PrimaryDarker, Primary, PrimaryOrange } from '../../contants';
import { InputField } from '../InputField/InputField';
import { Button } from '../Button/Button';
import { CustomerService } from '../../services/CustomerService';
import './CustomerScreen.css';
import { DropDown } from '../DropDown/DropDown';
import { IBank } from '../../interfaces/IBank';
import { BankService } from '../../services/BankService';

interface ICustomerScreenProps {}
interface ICustomerScreenState {
  isCreatingCustomer: boolean;
  tableData: JSX.Element[];
  name: string;
  bank: string;
  cpr: string;
  wantedCpr: string;
  wantedBank: string;
  banks: IBank[];
}

const customerService = new CustomerService();
const bankService = new BankService();
class CustomerScreen extends React.Component<ICustomerScreenProps, ICustomerScreenState> {
  constructor(props: Readonly<ICustomerScreenProps>) {
    super(props);
    this.state = {
      wantedBank: 'Choose a bank',
      name: '',
      wantedCpr: '',
      banks: [],
      bank: '',
      cpr: '',
      tableData: [],
      isCreatingCustomer: false,
    };
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
        tableData: customers.map(customer => (
          <tr>
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
  private onCreateCustomer = () => {};
  private onDeleteBank = () => {};

  public render() {
    console.log({ ...this.state });
    return (
      <div className="customerscreen-container">
        <h1 className="center-horizontal">Customer</h1>
        <div className="customerscreen-card-container center-horizontal">
          <div>
            <Card title="Create a new Customer" backgroundColor={white} width={500}>
              {this.state.isCreatingCustomer && <div>IS LOADING</div>}
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
              {this.state.isCreatingCustomer && <div>IS LOADING</div>}
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
        </div>
      </div>
    );
  }
}

export { CustomerScreen };
