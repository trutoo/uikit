import React, { Component, FormEvent, FocusEvent } from 'react';
import { Icon } from '@trutoo/ui-icons';
import { ValidationExpression } from '../../framework/models';
import { Validator } from '../../framework/validator';

interface Props {
  id?: string;
  className?: string;
  name?: string;
  value?: string;
  checked?: boolean;
  label?: string;
  disabled?: boolean;
  validators?: ValidationExpression<string>[];
  inputProps?: { [key: string]: string };
  onChange?: (state: string | undefined) => void;
}

interface State {
  id: string;
  invalid: boolean;
  focused: boolean;
  errors: string[];
}

export default class RadioButton extends Component<Props, State> {
  protected validator: Validator<string>;

  constructor(props: Props) {
    super(props);
    window.eid = window.eid || 0;
    this.validator = new Validator<string>(this.props.validators);
    this.state = {
      id: `id-${window.eid++}`,
      invalid: false,
      focused: false,
      errors: [],
    };
  }

  componentDidMount() {
    this.updateValidity(this.props.checked ? this.props.value : undefined);
  }

  componentDidUpdate(prevProps: Props) {
    if (!Object.is(this.props.validators, prevProps.validators))
      this.validator.replaceValidators(this.props.validators || []);
    if (this.props.checked !== prevProps.checked)
      this.updateValidity(this.props.checked ? this.props.value : undefined);
  }

  updateValidity(value: string | undefined) {
    const errors = this.validator.validate(value);
    this.setState({ errors, invalid: !!errors.length });
  }

  onChange = (event: FormEvent<HTMLInputElement>) => {
    if (this.props.onChange) this.props.onChange(event.currentTarget.checked ? event.currentTarget.value : undefined);
  };

  onFocusChange = (event: FocusEvent<HTMLInputElement>) => {
    this.setState({ focused: event.type === 'focus' });
  };

  /* RENDER */

  render() {
    return (
      <div
        className={
          'e-radiobutton ' +
          (this.props.className || '') +
          (this.state.focused ? ' focused' : '') +
          (this.props.disabled ? ' disabled' : '') +
          (this.state.invalid ? ' invalid ' : '')
        }>
        <input
          id={this.state.id}
          name={this.props.name}
          className="e-radiobutton--input"
          type="radio"
          value={this.props.value}
          checked={this.props.checked}
          onChange={this.onChange}
          onFocus={this.onFocusChange}
          onBlur={this.onFocusChange}
          {...this.props.inputProps}
        />
        <label className={'e-radiobutton--label'} htmlFor={this.state.id}>
          <Icon className="e-radiobutton--label-box" icon="icon-radio" />
          <Icon className="e-radiobutton--label-check" icon="icon-radio-center" />
          {this.props.label}
        </label>
        {this.state.invalid && this.state.errors.length && (
          <label className="e-radiobutton--error" htmlFor={this.state.id}>
            {this.state.errors.map(error => (
              <span key={error}>{'errors.field.' + error}</span>
            ))}
          </label>
        )}
      </div>
    );
  }
}