import React, { Component, FormEvent, FocusEvent } from 'react';
import '../../framework/core';
import { ValidationExpression } from '../../framework/models';
import { Validator } from '../../framework/validator';

interface Props {
  id?: string;
  className?: string;
  name?: string;
  label?: string;
  type?: string;
  value?: string;
  disabled?: boolean;
  validators?: ValidationExpression<string>[];
  inputProps?: { [key: string]: string };
  onChange?: (event: string) => void;
}

interface State {
  id: string;
  invalid: boolean;
  focused: boolean;
  errors: string[];
}

export default class TextArea extends Component<Props, State> {
  protected validator: Validator<string>;

  constructor(props: Props) {
    super(props);
    this.validator = new Validator(this.props.validators);
    this.state = {
      id: window.uikit.nextId(),
      invalid: false,
      focused: false,
      errors: [],
    };
  }

  componentDidMount() {
    this.updateValidity(this.props.value);
  }

  componentDidUpdate(prevProps: Props) {
    if (!Object.is(this.props.validators, prevProps.validators))
      this.validator.replaceValidators(this.props.validators || []);
    if (this.props.value !== prevProps.value) this.updateValidity(this.props.value);
  }

  updateValidity(value: string | undefined) {
    const errors = this.validator.validate(value);
    this.setState({ errors, invalid: !!errors.length });
  }

  onChange = (event: FormEvent<HTMLTextAreaElement>) => {
    if (this.props.onChange) this.props.onChange(event.currentTarget.value);
  };

  onFocusChange = (event: FocusEvent<HTMLTextAreaElement>) => {
    this.setState({ focused: event.type === 'focus' });
  };

  /* HELPERS */

  hasValueOrFocus(): boolean {
    if (this.state.focused) return true;
    if (this.props.value !== null && this.props.value !== undefined && this.props.value !== '') return true;
    return false;
  }

  /* RENDER */

  render() {
    return (
      <div
        className={
          'tu-textarea ' +
          (this.props.className || '') +
          (this.state.focused ? ' focused' : '') +
          (this.props.disabled ? ' disabled' : '') +
          (this.state.invalid ? ' invalid ' : '')
        }>
        {this.props.label && (
          <label className={'tu-textarea--label' + (this.hasValueOrFocus() ? ' floating' : '')} htmlFor={this.state.id}>
            {this.props.label}
          </label>
        )}
        <textarea
          id={this.state.id}
          name={this.props.name}
          className={'tu-textarea--input' + (this.props.label ? ' labelled' : '')}
          value={this.props.value}
          onChange={this.onChange}
          onFocus={this.onFocusChange}
          onBlur={this.onFocusChange}
          {...this.props.inputProps}
        />
        {this.state.invalid && this.state.errors.length && (
          <label className="tu-textarea--error" htmlFor={this.state.id}>
            {this.state.errors.map(error => (
              <span key={error}>{'errors.field.' + error}</span>
            ))}
          </label>
        )}
      </div>
    );
  }
}
