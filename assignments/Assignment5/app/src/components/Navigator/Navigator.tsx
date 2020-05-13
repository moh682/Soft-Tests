import * as React from 'react';
import { Link } from 'react-router-dom';

import './Navigator.css';

interface INavigatorProps {
  logout: () => void;
}

class Navigator extends React.Component<INavigatorProps> {
  public render() {
    return (
      <span className="navigator-container">
        <div className="navigator-content">
          <ul className="navigator-content-list">
            <li>
              <Link to="/" className="navigator-route">
                Home
              </Link>
            </li>
            <li>
              <Link to="/Account" className="navigator-route">
                Account
              </Link>
            </li>
            <li>
              <Link to="/Customer" className="navigator-route">
                Customer
              </Link>
            </li>
            <li>
              <Link to="/Bank" className="navigator-route">
                Bank
              </Link>
            </li>
            <li>
              <Link to="/Movement" className="navigator-route">
                Movement
              </Link>
            </li>
            <li>
              <p
                onClick={() => {
                  this.props.logout();
                }}
                className="navigator-route"
                style={{ margin: 0, padding: 0 }}
              >
                Logout
              </p>
            </li>
          </ul>
        </div>
      </span>
    );
  }
}

export { Navigator };
