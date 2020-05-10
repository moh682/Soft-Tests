import * as React from 'react';
import './Button.css';
import { PrimaryOrange } from '../../contants';

interface IButtonProps {
  onClick: () => void;
  label: string;
  style?: React.CSSProperties;
  color?: string;
  isDisabled?: boolean;
  className?: string;
  width?: number;
}

class Button extends React.Component<IButtonProps> {
  public render() {
    return (
      <button
        disabled={this.props.isDisabled}
        className={`button ${this.props.className || ''}`}
        style={{
          ...this.props.style,
          width: this.props.width || undefined,
          backgroundColor: this.props.color || PrimaryOrange,
        }}
        type="button"
        onClick={() => this.props.onClick()}
      >
        {this.props.label}
      </button>
    );
  }
}

export { Button };
