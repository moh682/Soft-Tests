import * as React from 'react';
import { PrimaryLighter } from '../../contants';

import './Card.css';

interface ICardProps {
  title?: string;
  width?: number;
  backgroundColor?: string;
}

class Card extends React.Component<ICardProps> {
  public render() {
    return (
      <div
        className="card-container"
        style={{
          backgroundColor: this.props.backgroundColor || PrimaryLighter,
          width: this.props.width,
        }}
      >
        {this.props.title && (
          <div className="card-title">
            <h2>{this.props.title}</h2>
          </div>
        )}
        <div className="card-content">{this.props.children}</div>
      </div>
    );
  }
}

export { Card };
