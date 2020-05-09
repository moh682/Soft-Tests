import * as React from 'react';
import { Card } from '../Card/Card';
import { white, PrimaryLightest, PrimaryDarker, PrimaryLighter, PrimaryDarkest, Primary } from '../../contants';
import { BankService } from '../../services/BankService';
import { StorageService } from '../../services/StorageService';
import { InputField } from '../InputField/InputField';
import { Button } from '../Button/Button';

import './BankScreen.css';

interface IBankProps {}

interface IBankState {
  tableData: JSX.Element[];
  cvr: string;
  wantedCvr: string;
  name: string;
  isCreatingBank: boolean;
  isDeletingBank: boolean;
}

const bankService = new BankService();
const storageServce = new StorageService();

class BankScreen extends React.Component<IBankProps, IBankState> {
  constructor(props: Readonly<IBankProps>) {
    super(props);
    this.state = {
      tableData: [],
      cvr: '',
      name: '',
      isCreatingBank: false,
      isDeletingBank: false,
      wantedCvr: '',
    };
  }

  public async componentWillMount() {
    if (storageServce.getNameToken() === 'admin') {
      await this.getData();
    }
  }

  private getData = async () => {
    let banks = await bankService.getAll();
    this.setState({
      tableData: banks.map((bank, index) => (
        <tr style={{ backgroundColor: index % 2 === 1 ? PrimaryLighter : PrimaryLightest }} key={`banksTable${index}`}>
          <td>{bank.name}</td>
          <td>{bank.cvr}</td>
        </tr>
      )),
    });
  };

  private onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.name === 'cvr') this.setState({ cvr: e.target.value });
    if (e.currentTarget.name === 'name') this.setState({ name: e.target.value });
    if (e.currentTarget.name === 'wantedCvr') this.setState({ wantedCvr: e.target.value });
  };

  private onDeleteBank = async () => {
    this.setState({ isDeletingBank: true, wantedCvr: '' });
    const isDeleted = await bankService.delete(this.state.wantedCvr);
    if (!isDeleted) alert('An error occured');
    await this.getData();
    this.setState({ isDeletingBank: false });
  };

  private onCreateBank = async () => {
    this.setState({ isCreatingBank: true, name: '', cvr: '' });
    const isCreated = await bankService.create(this.state.cvr, this.state.name);
    if (isCreated) {
      await this.getData();
    } else {
      alert('An error has occured');
    }
    this.setState({ isCreatingBank: false });
  };

  public render() {
    return (
      <div className="home-container">
        <h1 className="center-horizontal">Banks</h1>
        <div className="bankscreen-card-container center-horizontal">
          <div>
            <Card title="Create a new Bank" backgroundColor={white} width={500}>
              {this.state.isCreatingBank && <div>IS LOADING</div>}
              {!this.state.isCreatingBank && (
                <div className="bankscreen-form-container">
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
                    name="cvr"
                    curved={true}
                    value={this.state.cvr}
                    onChange={e => {
                      this.onChangeHandler(e);
                    }}
                    inputFieldColor={PrimaryLightest}
                    placeholder="cvr"
                  />
                  <Button onClick={() => this.onCreateBank()} label="Create Bank" color={PrimaryDarker} />
                </div>
              )}
            </Card>
          </div>
          <div>
            <Card title="Delete a Bank" backgroundColor={white} width={500}>
              {this.state.isCreatingBank && <div>IS LOADING</div>}
              {!this.state.isCreatingBank && (
                <div className="bankscreen-form-container">
                  <InputField
                    name="wantedCvr"
                    inputFieldColor={PrimaryLightest}
                    curved={true}
                    value={this.state.wantedCvr}
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
            <Card title="All Banks" backgroundColor={white} width={500}>
              <div className="table-container">
                <table>
                  <thead style={{ backgroundColor: Primary }}>
                    <tr>
                      <th>Name</th>
                      <th>Cvr</th>
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

export { BankScreen };
