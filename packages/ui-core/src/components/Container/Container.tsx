import React, { Component, HTMLAttributes } from 'react';

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {}

export interface ContainerState {}

export default class Container extends Component<ContainerProps, ContainerState> {
  constructor(props: ContainerProps) {
    super(props);

    this.state = {};
  }

  public render() {
    const { className, children, ...rest } = this.props;
    return (
      <div {...rest} className={`tu-container ${className || ''}`}>
        {children}
      </div>
    );
  }
}
