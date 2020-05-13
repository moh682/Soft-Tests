import * as React from 'react';
import './DropDown.css';
import { PrimaryDarker, PrimaryLightest } from '../../contants';
import { Button } from '../Button/Button';

interface IDropDownProps {
  onChange: (value: any) => void;
  elements: any[];
  backgroundColor?: string;
  label: string;
  value: any;
  curved?: boolean;
  width?: number;
  isDisabled?: boolean;
  valueWhenEmpty?: string;
}
interface IDropDownState {
  isClicked: boolean;
}

class DropDown extends React.Component<IDropDownProps, IDropDownState> {
  state = {
    isClicked: false,
  };
  public render() {
    const value = this.props.elements.length !== 0 ? this.props.value : 'Empty';
    return (
      <div>
        {this.props.label}
        <div className="dropdown">
          <Button
            isDisabled={this.props.isDisabled || this.props.elements.length === 0}
            onClick={() => {
              this.setState({ isClicked: !this.state.isClicked });
            }}
            color={PrimaryLightest}
            label={value || 'choose a value'}
            width={this.props.width}
            style={{
              borderRadius: this.props.curved ? '10px' : undefined,
              backgroundColor: this.props.backgroundColor || PrimaryDarker,
            }}
            className="dropbtn"
          />
          {this.state.isClicked && (
            <div className="dropdown-content" style={{ backgroundColor: this.props.backgroundColor || '#fff' }}>
              {this.props.elements.map((value, index) => {
                return (
                  <span
                    className="dropdown-element"
                    onClick={e => {
                      this.props.onChange(e.currentTarget.innerHTML);
                      this.setState({ isClicked: false });
                    }}
                    key={index}
                  >
                    {value}
                  </span>
                );
              })}
            </div>
          )}
        </div>
      </div>
    );
  }
}

export { DropDown };
