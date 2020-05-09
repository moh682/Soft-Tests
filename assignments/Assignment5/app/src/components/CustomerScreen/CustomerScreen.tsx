import * as React from 'react';
import { Card } from '../Card/Card';
import { white, PrimaryLightest, PrimaryDarker, Primary } from '../../contants';
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
  tableData: [];
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
      wantedBank: '',
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
      console.log(res);
    });
  };
  private onChangeHandler = (e: React.InputHTMLAttributes<HTMLElement>) => {};
  private onCreateCustomer = () => {};
  private onDeleteBank = () => {};

  public render() {
    return (
      <div className="customerscreen-container">
        <h1 className="center-horizontal">Customer</h1>
        <div className="customerscreen-card-container center-horizontal">
          <div>
            <Card title="Create a new Bank" backgroundColor={white} width={500}>
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
                      label={this.state.wantedBank || 'Choose a bank'}
                      elements={['123', '1231231']}
                      onChange={cvr => {
                        this.setState({ wantedBank: cvr });
                      }}
                    />
                  </div>
                  <Button onClick={() => this.onCreateCustomer()} label="Create Bank" color={PrimaryDarker} />
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
                    placeholder="cvr of the bank"
                  />
                  <Button onClick={() => this.onDeleteBank()} label="Delete Bank" color={PrimaryDarker} />
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
                      <th>Cvr</th>
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
