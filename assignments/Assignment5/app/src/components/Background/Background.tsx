import * as React from 'react';
import { PrimaryLighter, PrimaryLightest } from '../../contants';
import './Background.css';

class Background extends React.Component {
  public render() {
    return (
      <div className="background">
        <div style={{ backgroundColor: PrimaryLighter }} className="circle1" />
        <div style={{ backgroundColor: PrimaryLightest }} className="circle2" />
        <div className="circle3" />
      </div>
    );
  }
}

export { Background };
