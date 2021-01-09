import '../../framework/core';

import React, { Component, FocusEvent, FormEvent } from 'react';

import { ValidationExpression } from '../../framework/models';
import { Validator } from '../../framework/validator';

export interface Option {
  key: string | number;
  label: string | number;
  disabled?: boolean;
}

export interface OptionGroup {
  label: string;
  disabled?: boolean;
  options: Option[];
}

interface Props {
  id?: string;
  className?: string;
  name?: string;
  label?: string;
  value?: string;
  placeholder?: string;
  options?: (Option | OptionGroup)[];
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

export default class Select extends Component<Props, State> {
  protected validator: Validator<string>;

  constructor(props: Props) {
    super(props);
    this.validator = new Validator(this.props.validators);
    this.state = {
      id: '',
      invalid: false,
      focused: false,
      errors: [],
    };
  }

  componentDidMount() {
    this.setState({ id: window.uikit.nextId() });
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

  onChange = (event: FormEvent<HTMLSelectElement>) => {
    if (this.props.onChange) this.props.onChange(event.currentTarget.value);
  };

  onFocusChange = (event: FocusEvent<HTMLSelectElement>) => {
    this.setState({ focused: event.type === 'focus' });
  };

  /* HELPERS */

  hasValueOrFocus(): boolean {
    if (this.state.focused) return true;
    if (this.props.value !== null && this.props.value !== undefined && this.props.value !== '') return true;
    return false;
  }

  /* TYPE CASTS */

  private castOption(option: Option): Option {
    return option;
  }

  private castGroup(group: OptionGroup): OptionGroup {
    return group;
  }

  /* TYPE CHECKS */

  private isOption(option: Option | OptionGroup): option is Option {
    return 'key' in option;
  }

  private isGroup(option: Option | OptionGroup): option is OptionGroup {
    return 'options' in option;
  }

  /* RENDER */

  private templateOption(option: Option) {
    return (
      <option key={option.key} className={'tu-select--option'} value={option.key} disabled={!!option.disabled}>
        {option.label}
      </option>
    );
  }

  private templateGroup(group: OptionGroup) {
    return (
      <optgroup key={group.label} className={'tu-select--optgroup'} label={group.label} disabled={!!group.disabled}>
        {group.options.map(this.templateOption)}
      </optgroup>
    );
  }

  render() {
    return (
      <div
        className={
          'tu-select ' +
          (this.props.className || '') +
          (this.state.focused ? ' focused' : '') +
          (this.props.disabled ? ' disabled' : '') +
          (this.state.invalid ? ' invalid ' : '')
        }>
        {this.props.label && (
          <label className={'tu-select--label' + (this.hasValueOrFocus() ? ' floating' : '')} htmlFor={this.state.id}>
            {this.props.label}
          </label>
        )}
        <select
          id={this.state.id}
          name={this.props.name}
          value={this.props.value}
          className={'tu-select--input' + (this.props.label ? ' labelled' : '')}
          onChange={this.onChange}
          onFocus={this.onFocusChange}
          onBlur={this.onFocusChange}
          {...this.props.inputProps}>
          {this.props.placeholder && (
            <option value="" disabled hidden>
              {this.props.placeholder}
            </option>
          )}
          {this.props.options &&
            this.props.options.map((item) =>
              this.isOption(item) ? this.templateOption(item) : this.templateGroup(item),
            )}
        </select>
        {this.state.invalid && this.state.errors.length && (
          <label className="tu-select--error" htmlFor={this.state.id}>
            {this.state.errors.map((error) => (
              <span key={error}>{'errors.field.' + error}</span>
            ))}
          </label>
        )}
      </div>
    );
  }
}
