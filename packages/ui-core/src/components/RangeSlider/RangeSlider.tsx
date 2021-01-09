import '../../framework/core';

import React, { Component, FocusEvent, FormEvent } from 'react';

import { ValidationExpression } from '../../framework/models';
import { Validator } from '../../framework/validator';

export interface RangeSliderProps {
  id?: string;
  className?: string;
  name?: string;
  label?: string;
  value?: number;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  validators?: ValidationExpression<number>[];
  inputProps?: { [key: string]: string };
  onChange?: (event: number) => void;
}

export interface RangeSliderState {
  id: string;
  invalid: boolean;
  focused: boolean;
  errors: string[];
}

export default class RangeSlider extends Component<RangeSliderProps, RangeSliderState> {
  protected validator: Validator<number>;

  constructor(props: RangeSliderProps) {
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

  componentDidUpdate(prevProps: RangeSliderProps) {
    if (!Object.is(this.props.validators, prevProps.validators))
      this.validator.replaceValidators(this.props.validators || []);
    if (this.props.value !== prevProps.value) this.updateValidity(this.props.value);
  }

  updateValidity(value: number | undefined) {
    const errors = this.validator.validate(value);
    this.setState({ errors, invalid: !!errors.length });
  }

  onChange = (event: FormEvent<HTMLInputElement>) => {
    if (this.props.onChange) this.props.onChange(parseInt(event.currentTarget.value, 10));
  };

  onFocusChange = (event: FocusEvent<HTMLInputElement>) => {
    this.setState({ focused: event.type === 'focus' });
  };

  /* HELPERS */

  hasValueOrFocus(): boolean {
    if (this.state.focused) return true;
    if (this.props.value !== null && this.props.value !== undefined) return true;
    return false;
  }

  hasProgress(): boolean {
    const ua = navigator.userAgent.toLowerCase();
    return ua.indexOf('firefox') > -1 || ua.indexOf('edge') > -1 || ua.indexOf('trident') > -1;
  }

  round(number: number, nearest: number) {
    return Math.round(number / nearest) * nearest;
  }

  /* RENDER */

  render() {
    const value = this.round(this.props.value || 0, this.props.step || 1);
    const progress = this.round((value / (this.props.max || 100)) * 100, this.props.step || 1);
    console.log(
      this.props.min,
      this.props.max,
      this.props.value,
      this.props.step,
      ((this.props.value || 0) / (this.props.max || 100)) * 100,
      value,
      progress,
    );
    return (
      <div
        className={
          'tu-rangeslider ' +
          (this.props.className || '') +
          (this.state.focused ? ' focused' : '') +
          (this.props.disabled ? ' disabled' : '') +
          (this.state.invalid ? ' invalid ' : '')
        }>
        {this.props.label && (
          <label className={'tu-rangeslider--label'} htmlFor={this.state.id}>
            {this.props.label}
          </label>
        )}
        <div className={'tu-rangeslider--wrapper'}>
          <input
            id={this.state.id}
            name={this.props.name}
            className={'tu-rangeslider--input'}
            type={'range'}
            min={this.props.min}
            max={this.props.max}
            step={this.props.step}
            value={value}
            onChange={this.onChange}
            onFocus={this.onFocusChange}
            onBlur={this.onFocusChange}
            {...this.props.inputProps}
          />
          {!this.hasProgress() && (
            <div className={'tu-rangeslider--input-webkit-progress'} style={{ width: `${progress}%` }} />
          )}
        </div>
        {this.state.invalid && this.state.errors.length && (
          <label className="tu-rangeslider--error" htmlFor={this.state.id}>
            {this.state.errors.map((error) => (
              <span key={error}>{'errors.field.' + error}</span>
            ))}
          </label>
        )}
      </div>
    );
  }
}
