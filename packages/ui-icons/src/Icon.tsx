import React, { Component, MouseEvent } from 'react';

interface Props {
  id: string;
  className?: string;
  size?: string | number;
  color?: string;
  title?: string;
  description?: string;
  tabIndex?: number;
  onClick?: (event: MouseEvent<SVGElement>) => void;
}

export default class Icon extends Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  public render() {
    return (
      <svg
        className={this.props.className}
        tabIndex={this.props.tabIndex}
        onClick={this.props.onClick}
        style={{
          width: this.props.size,
          height: this.props.size,
          fill: this.props.color,
        }}>
        {this.props.title && <title>{this.props.title}</title>}
        {this.props.description && <desc>{this.props.description}</desc>}
        <use xlinkHref={`#icon-${this.props.id}`} />
      </svg>
    );
  }
}
