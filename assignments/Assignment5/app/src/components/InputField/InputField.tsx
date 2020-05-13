import * as React from 'react';
import './InputField.css';
interface IInputFieldProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: number | string;
  name: string;
  style?: React.CSSProperties;
  placeholder?: string;
  curved?: boolean;
  inputFieldColor?: string;
  isNumbers?: boolean;
}

class InputField extends React.Component<IInputFieldProps> {
  public render() {
    return (
      <div className="InputField" style={this.props.style}>
        <input
          type={this.props.isNumbers ? 'number' : 'text'}
          name={this.props.name}
          style={{
            borderRadius: this.props.curved ? '10px' : '0px',
            backgroundColor: this.props.inputFieldColor,
          }}
          placeholder={this.props.placeholder || '...'}
          className="input-field"
          value={this.props.value}
          onChange={e => this.props.onChange(e)}
        />
      </div>
    );
  }
}

export { InputField };
