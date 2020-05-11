import * as React from 'react';
import './Spinner.css';
import { Primary } from '../../contants';

interface ILoadingProps {
  color?: string;
  size?: number;
  rotationSpeedInMilliseconds?: number;
}

class Spinner extends React.Component<ILoadingProps> {
  public render() {
    const speed = this.props.rotationSpeedInMilliseconds || 800;
    const size = this.props.size || 25;
    return (
      <div className="loader loader--style3">
        <svg version="1.1" id="loader-1" x="0px" y="0px" color="red" width={size} height={size} viewBox={`0 0 50 50`}>
          <path
            fill={this.props.color || Primary}
            d="M43.935,25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615c8.072,0,14.615,6.543,14.615,14.615H43.935z"
          >
            <animateTransform
              attributeType="xml"
              attributeName="transform"
              type="rotate"
              from="0 25 25"
              to="360 25 25"
              dur={`${speed}ms`}
              repeatCount="indefinite"
            />
          </path>
        </svg>
      </div>
    );
  }
}

export { Spinner };
