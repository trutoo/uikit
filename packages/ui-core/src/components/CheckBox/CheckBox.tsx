import React, { Component, FormEvent, FocusEvent } from 'react';
import { Icon } from '@trutoo/ui-icons';
import '../../framework/core';
import { ValidationExpression } from '../../framework/models';
import { Validator } from '../../framework/validator';

export interface CheckBoxProps {
  id?: string;
  className?: string;
  name?: string;
  value?: string;
  checked?: boolean;
  label?: string;
  disabled?: boolean;
  validators?: ValidationExpression<boolean>[];
  inputProps?: { [key: string]: string };
  onChange?: (value: boolean) => void;
}

export interface CheckBoxState {
  id: string;
  invalid: boolean;
  focused: boolean;
  errors: string[];
}

export default class CheckBox extends Component<CheckBoxProps, CheckBoxState> {
  protected validator: Validator<boolean>;

  constructor(props: CheckBoxProps) {
    super(props);
    this.validator = new Validator<boolean>(this.props.validators);
    this.state = {
      id: '',
      invalid: false,
      focused: false,
      errors: [],
    };
  }

  componentDidMount() {
    this.setState({ id: window.uikit.nextId() });
    this.updateValidity(this.props.checked);
  }

  componentDidUpdate(prevProps: CheckBoxProps) {
    if (!Object.is(this.props.validators, prevProps.validators))
      this.validator.replaceValidators(this.props.validators || []);
    if (this.props.checked !== prevProps.checked) this.updateValidity(this.props.checked);
  }

  updateValidity(value: boolean | undefined) {
    const errors = this.validator.validate(value);
    this.setState({ errors, invalid: !!errors.length });
  }

  onChange = (event: FormEvent<HTMLInputElement>) => {
    if (this.props.onChange) this.props.onChange(event.currentTarget.checked);
  };

  onFocusChange = (event: FocusEvent<HTMLInputElement>) => {
    this.setState({ focused: event.type === 'focus' });
  };
  /* RENDER */

  render() {
    return (
      <div
        className={
          'tu-checkbox ' +
          (this.props.className || '') +
          (this.state.focused ? ' focused' : '') +
          (this.props.disabled ? ' disabled' : '') +
          (this.state.invalid ? ' invalid ' : '')
        }>
        <input
          id={this.state.id}
          name={this.props.name}
          className="tu-checkbox--input"
          type="checkbox"
          value={this.props.value}
          checked={this.props.checked}
          onChange={this.onChange}
          onFocus={this.onFocusChange}
          onBlur={this.onFocusChange}
          {...this.props.inputProps}
        />
        <label className={'tu-checkbox--label'} htmlFor={this.state.id}>
          <Icon className="tu-checkbox--label-box" id="checkbox" />
          <Icon className="tu-checkbox--label-check" id="checkbox-check-alt" />
          {this.props.label}
        </label>
        {this.state.invalid && this.state.errors.length && (
          <label className="tu-checkbox--error" htmlFor={this.state.id}>
            {this.state.errors.map(error => (
              <span key={error}>{'errors.field.' + error}</span>
            ))}
          </label>
        )}
      </div>
    );
  }
}
