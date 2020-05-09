import * as React from 'react';
import { InputField } from '../InputField/InputField';
import { Button } from '../Button/Button';
import { PrimaryLighter, PrimaryLightest } from '../../contants';

import './LoginScreen.css';
interface ILoginProps {
  onLogin: (cpr: string) => void;
}

interface ILoginState {
  cpr: string;
}

class Login extends React.Component<ILoginProps, ILoginState> {
  state = {
    cpr: '',
  };

  public render() {
    return (
      <div className="login-container">
        <div className="login-content">
          <div className="login-form" style={{ backgroundColor: PrimaryLighter }}>
            <h1>Welcome</h1>
            <InputField
              name="cpr"
              curved={true}
              placeholder="CPR number"
              value={this.state.cpr}
              onChange={e => {
                this.setState({ cpr: e.target.value });
              }}
            />
            <div className="buttons-wrapper" style={{ marginTop: 10 }}>
              <Button label="Login" color={PrimaryLightest} onClick={() => this.props.onLogin(this.state.cpr)} />
            </div>
            <p>Type "admin" if you dont have a CPR number</p>
          </div>
        </div>
      </div>
    );
  }
}

export { Login };
