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
          width: this.props.size || '1em',
          height: this.props.size || '1em',
          fill: this.props.color,
        }}>
        <use xlinkHref={`#${this.props.icon}`} />
      </svg>
    );
  }
}
