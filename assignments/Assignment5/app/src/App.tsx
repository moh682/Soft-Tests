import * as React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { Login } from './components/LoginScreen/LoginScreen';
import { StorageService } from './services/StorageService';
import { Navigator } from './components/Navigator/Navigator';
import { Background } from './components/Background/Background';
import { HomeScreen } from './components/Screens/HomeScreen/HomeScreen';
import { BankScreen } from './components/Screens/BankScreen/BankScreen';
import { AccountScreen } from './components/Screens/AccountScreen/AccountScreen';
import { CustomerScreen } from './components/Screens/CustomerScreen/CustomerScreen';
import { MovementScreen } from './components/Screens/MovementScreen/MovementScreen';

import './App.css';

interface IAppProps {}
interface IAppState {
  isLoggedIn: boolean;
  isLoading: boolean;
  name: string;
}

const storageService: StorageService = new StorageService();

class App extends React.Component<IAppProps, IAppState> {
  constructor(props: Readonly<IAppProps>) {
    super(props);
    const name = storageService.getNameToken();
    this.state = {
      isLoading: false,
      isLoggedIn: name !== null || false,
      name: name || '',
    };
  }

  onLogin = (str: string) => {
    if (!str || str === '') return alert('You must enter a name');
    if (str === 'admin') {
      this.setState({ isLoading: false, isLoggedIn: true, name: 'admin' });
      storageService.setNameToken(str);
    }
    this.setState({ isLoading: true });
    document.location.href = '/';
  };

  logout = () => {
    storageService.removeToken();
    document.location.href = '/';
    this.setState({ isLoggedIn: false });
  };

  public render() {
    const { isLoggedIn } = this.state;
    const hasValue = storageService.getNameToken();

    return (
      <div id="app">
        {!isLoggedIn && <Login onLogin={this.onLogin} />}
        {isLoggedIn && hasValue && (
          <Router>
            <Background />
            <Navigator logout={this.logout} />
            <div className="app-content-container">
              {this.state.isLoggedIn && (
                <Switch>
                  <Route exact path="/">
                    <HomeScreen />
                  </Route>
                  <Route path="/Account">
                    <AccountScreen />
                  </Route>
                  <Route path="/Customer">
                    <CustomerScreen />
                  </Route>
                  <Route path="/Bank">
                    <BankScreen />
                  </Route>
                  <Route path="/Movement">
                    <MovementScreen />
                  </Route>
                </Switch>
              )}
            </div>
          </Router>
        )}
      </div>
    );
  }
}

export default App;
