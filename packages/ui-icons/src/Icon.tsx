import React, { Component } from 'react';

interface Props {
  icon: string;
  className?: string;
  size?: string | number;
  color?: string;
}

export default class Icon extends Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  public render() {
    return (
      <svg
        className={this.props.className}
        style={{
          width: this.props.size,
          height: this.props.size,
          fill: this.props.color,
        }}>
        <use xlinkHref={`#${this.props.icon}`} />
      </svg>
    );
  }
}
