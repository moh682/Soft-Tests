import * as React from 'react';
import { Card } from '../../Card/Card';
import { white, PrimaryLightest, PrimaryOrange } from '../../../contants';
import { IMovement } from '../../../interfaces/IMovement';
import { MovementService } from '../../../services/MovementService';
import { InputField } from '../../InputField/InputField';
import { Button } from '../../Button/Button';
import { Spinner } from '../../Spinner/Spinner';
import { AccountService } from '../../../services/AccountService';

import './HomeScreen.css';
interface IHomeProps {}

interface IHomeState {
  movements: IMovement[];
  tableData: JSX.Element[];
  isTransfering: boolean;
  current: number | undefined;
  target: number | undefined;
  balance: number | undefined;
}

const movementService = new MovementService();
const accountService = new AccountService();

export class HomeScreen extends React.Component<IHomeProps, IHomeState> {
  public constructor(props: Readonly<IHomeProps>) {
    super(props);
    this.state = {
      movements: [],
      tableData: [],
      isTransfering: false,
      current: undefined,
      target: undefined,
      balance: undefined,
    };
  }

  public async componentWillMount() {
    this.getData();
  }

  getData = async () => {
    const movements = await movementService.getAll();
    const tableData = movements.map((movement, index) => {
      return (
        <tr key={`movement${index}`}>
          <td>{movement.accountFrom}</td>
          <td>{movement.accountTo}</td>
          <td>{movement.amount}</td>
          <td>{movement.time}</td>
        </tr>
      );
    });
    this.setState({
      tableData,
    });
  };

  onMakeTransaction = async () => {
    this.setState({ isTransfering: true });
    const { balance, current, target } = this.state;

    const isTransfered = await accountService.transfer(current as number, target as number, balance as number);
    if (!isTransfered) alert('An Error Has Occured');

    this.getData();
    this.setState({ isTransfering: false });
  };

  public render(): JSX.Element {
    return (
      <div className="homescreen-container">
        <h1 className="center-horizontal">Home</h1>
        <h4 className="center-horizontal">To create, delete or update data go to the respectful page.</h4>
        <div className="homescreen-card-container center-horizontal">
          <div>
            <Card title="Make a transaction" backgroundColor={white} width={500}>
              {this.state.isTransfering && (
                <div>
                  <Spinner />
                </div>
              )}
              {!this.state.isTransfering && (
                <div className="homescreen-form-container">
                  <InputField
                    name="current"
                    inputFieldColor={PrimaryLightest}
                    curved={true}
                    value={this.state.current as any}
                    isNumbers={true}
                    onChange={e => {
                      this.setState({ current: e.target.value as any });
                    }}
                    placeholder="Current Account"
                  />
                  <InputField
                    name="target"
                    inputFieldColor={PrimaryLightest}
                    curved={true}
                    value={this.state.target as any}
                    isNumbers={true}
                    onChange={e => {
                      this.setState({ target: e.target.value as any });
                    }}
                    placeholder="Target Account"
                  />
                  <InputField
                    name="amount"
                    inputFieldColor={PrimaryLightest}
                    curved={true}
                    value={this.state.balance as any}
                    isNumbers={true}
                    onChange={e => {
                      this.setState({ balance: e.target.value as any });
                    }}
                    placeholder="Amount"
                  />
                  <Button
                    onClick={() => {
                      this.onMakeTransaction();
                    }}
                    label="Trasfer Money"
                    color={PrimaryOrange}
                  />
                </div>
              )}
            </Card>
          </div>
          <div>
            <Card title="View all Movements" backgroundColor={white} width={500}>
              <div className="table-container">
                <table>
                  <thead style={{ backgroundColor: PrimaryLightest }}>
                    <tr>
                      <th>From</th>
                      <th>To</th>
                      <th>Amount</th>
                      <th>Date</th>
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
