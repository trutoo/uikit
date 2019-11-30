import React, { Component, MouseEvent, HTMLAttributes } from 'react';

export type ButtonTypes = 'button' | 'submit' | 'reset' | 'link';

interface Props extends HTMLAttributes<HTMLAnchorElement | HTMLButtonElement> {
  type?: ButtonTypes;
  href?: string;
  disabled?: boolean;
  onClick?: (event: MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => void;
}

interface State {
  id: string;
}

export default class Button extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    window.eid = window.eid || 0;
    this.state = {
      id: `id-${window.eid++}`,
    };
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
        className={`e-button ${className || '' + (disabled ? ' disabled' : '')}`}
        id={this.state.id}
        href={href}
        onClick={this.onClick}>
        {children}
      </a>
    ) : (
      <button
        {...rest}
        className={`e-button ${className || ''}`}
        id={this.state.id}
        type={type || 'button'}
        disabled={disabled}
        onClick={this.onClick}>
        {children}
      </button>
    );
  }
}
