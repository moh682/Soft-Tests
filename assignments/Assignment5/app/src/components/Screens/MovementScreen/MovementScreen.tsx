import * as React from 'react';
import { white, PrimaryLightest, PrimaryOrange } from '../../../contants';
import { InputField } from '../../InputField/InputField';
import { Card } from '../../Card/Card';
import { Spinner } from '../../Spinner/Spinner';
import { Button } from '../../Button/Button';
import { MovementService } from '../../../services/MovementService';

import './MovementScreen.css';

interface IMovementScreenProps {}
interface IMovementScreenState {
  isDeletingMovement: boolean;
  movements: [];
  tableData: JSX.Element[];
  number: number | undefined;
}

const movementService = new MovementService();
class MovementScreen extends React.Component<IMovementScreenProps, IMovementScreenState> {
  constructor(props: Readonly<IMovementScreenProps>) {
    super(props);
    this.state = {
      isDeletingMovement: false,
      tableData: [],
      movements: [],
      number: undefined,
    };
  }

  async componentWillMount() {
    await this.getData();
  }

  getData = async () => {
    const movements = await movementService.getAll();
    const tableData = movements.map((movement, index) => {
      return (
        <tr key={`movement${index}`}>
          <td>{movement.id}</td>
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

  onDeleteTransaction = async () => {
    this.setState({ isDeletingMovement: true });
    const { number } = this.state;
    const isDeleted = await movementService.delete(number as number);
    if (!isDeleted) alert('An Error Occured');
    await this.getData();
    this.setState({ isDeletingMovement: false, number: undefined });
  };

  public render() {
    return (
      <div className="movementscreen-container">
        <h1 className="center-horizontal">Movement</h1>
        <div className="movementscreen-card-container center-horizontal">
          <div>
            <Card title="Delete a movement" backgroundColor={white} width={500}>
              {this.state.isDeletingMovement && (
                <div>
                  <Spinner />
                </div>
              )}
              {!this.state.isDeletingMovement && (
                <div className="movementscreen-form-container">
                  <InputField
                    name="number"
                    inputFieldColor={PrimaryLightest}
                    curved={true}
                    value={this.state.number as any}
                    isNumbers={true}
                    onChange={e => {
                      this.setState({ number: e.target.value as any });
                    }}
                    placeholder="Movement ID"
                  />
                  <Button
                    onClick={() => {
                      this.onDeleteTransaction();
                    }}
                    label="Delete movement"
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
                      <th>id</th>
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

export { MovementScreen };
