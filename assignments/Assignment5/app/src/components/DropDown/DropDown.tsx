import * as React from 'react';
import './DropDown.css';
import { PrimaryDarker, PrimaryLightest } from '../../contants';
import { Button } from '../Button/Button';

interface IDropDownProps {
  onChange: (value: any) => void;
  elements: any[];
  backgroundColor?: string;
  label: string;
  curved?: boolean;
  width?: number;
  isDisabled?: boolean;
}
interface IDropDownState {
  isClicked: boolean;
}

class DropDown extends React.Component<IDropDownProps, IDropDownState> {
  state = {
    isClicked: false,
  };
  public render() {
    console.log({ ...this.state });
    return (
      <div className="dropdown">
        <Button
          isDisabled={this.props.isDisabled}
          onClick={() => {
            this.setState({ isClicked: true });
          }}
          color={PrimaryLightest}
          label={this.props.elements.length !== 0 ? this.props.label : 'There are no banks available'}
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
    );
  }
}

export { DropDown };
