import * as React from 'react';
import { Card } from '../Card/Card';
import { white, PrimaryLightest, PrimaryDarker, PrimaryOrange } from '../../contants';
import { IMovement } from '../../interfaces/IMovement';
import { MovementService } from '../../services/MovementService';
import { InputField } from '../InputField/InputField';
import { Button } from '../Button/Button';
import './HomeScreen.css';

interface IHomeProps {}

interface IHomeState {
  movements: IMovement[];
  tableData: JSX.Element[];
  isTransfering: boolean;
}

const movementService = new MovementService();

export class HomeScreen extends React.Component<IHomeProps, IHomeState> {
  public constructor(props: Readonly<IHomeProps>) {
    super(props);
    this.state = {
      movements: [],
      tableData: [],
      isTransfering: false,
    };
  }

  public async componentWillMount() {
    const movements = await movementService.getAll();
    console.log(movements);
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
  }

  public render(): JSX.Element {
    return (
      <div className="homescreen-container">
        <h1 className="center-horizontal">Home</h1>
        <h4 className="center-horizontal">To create, delete or update data go to the respectful page.</h4>
        <div className="homescreen-card-container center-horizontal">
          <div>
            <Card title="Make a transaction" backgroundColor={white} width={500}>
              {this.state.isTransfering && <div>IS LOADING</div>}
              {!this.state.isTransfering && (
                <div className="homescreen-form-container">
                  <InputField
                    name="account"
                    inputFieldColor={PrimaryLightest}
                    curved={true}
                    value={'name'}
                    onChange={e => {}}
                    placeholder="name"
                  />
                  <InputField
                    name="name"
                    inputFieldColor={PrimaryLightest}
                    curved={true}
                    value={'name'}
                    onChange={e => {}}
                    placeholder="name"
                  />
                  <Button onClick={() => {}} label="Create Bank" color={PrimaryOrange} />
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
