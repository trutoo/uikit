import React, { Component, HTMLAttributes } from 'react';

interface Props extends HTMLAttributes<HTMLDivElement> {}

interface State {}

export default class Container extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {};
  }

  public render() {
    const { className, children, ...rest } = this.props;
    return (
      <div {...rest} className={`e-container ${className || ''}`}>
        {children}
      </div>
    );
  }
}
