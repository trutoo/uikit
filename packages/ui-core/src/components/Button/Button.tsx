import '../../framework/core';

import React, { Component, HTMLAttributes, MouseEvent } from 'react';

export type ButtonTypes = 'button' | 'submit' | 'reset' | 'link';

export interface ButtonProps extends HTMLAttributes<HTMLAnchorElement | HTMLButtonElement> {
  type?: ButtonTypes;
  href?: string;
  disabled?: boolean;
  onClick?: (event: MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => void;
}

export interface ButtonState {
  id: string;
}

export default class Button extends Component<ButtonProps, ButtonState> {
  constructor(props: ButtonProps) {
    super(props);
    this.state = {
      id: '',
    };
  }

  componentDidMount() {
    this.setState({ id: window.uikit.nextId() });
  }

  private onClick = (event: MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
    event.stopPropagation();
    if (this.props.disabled) return;
    if (this.props.onClick) this.props.onClick(event);
  };

  render() {
    const { className, type, href, disabled, children, ...rest } = this.props;
    return type === 'link' ? (
      <a
        {...rest}
        className={`tu-button ${className || '' + (disabled ? ' disabled' : '')}`}
        id={this.state.id}
        href={href}
        onClick={this.onClick}>
        {children}
      </a>
    ) : (
      <button
        {...rest}
        className={`tu-button ${className || ''}`}
        id={this.state.id}
        type={type || 'button'}
        disabled={disabled}
        onClick={this.onClick}>
        {children}
      </button>
    );
  }
}
