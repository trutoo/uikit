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
  validators?: ValidationExpression<boolean>[];
  inputProps?: { [key: string]: string };
  onChange?: (value: boolean) => void;
}

interface State {
  id: string;
  invalid: boolean;
  focused: boolean;
  errors: string[];
}

export default class CheckBox extends Component<Props, State> {
  protected validator: Validator<boolean>;

  constructor(props: Props) {
    super(props);
    window.eid = window.eid || 0;
    this.validator = new Validator<boolean>(this.props.validators);
    this.state = {
      id: `id-${window.eid++}`,
      invalid: false,
      focused: false,
      errors: [],
    };
  }

  componentDidMount() {
    this.updateValidity(this.props.checked);
  }

  componentDidUpdate(prevProps: Props) {
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
          'e-checkbox ' +
          (this.props.className || '') +
          (this.state.focused ? ' focused' : '') +
          (this.props.disabled ? ' disabled' : '') +
          (this.state.invalid ? ' invalid ' : '')
        }>
        <input
          id={this.state.id}
          name={this.props.name}
          className="e-checkbox--input"
          type="checkbox"
          value={this.props.value}
          checked={this.props.checked}
          onChange={this.onChange}
          onFocus={this.onFocusChange}
          onBlur={this.onFocusChange}
          {...this.props.inputProps}
        />
        <label className={'e-checkbox--label'} htmlFor={this.state.id}>
          <Icon className="e-checkbox--label-box" icon="icon-checkbox" />
          <Icon className="e-checkbox--label-check" icon="icon-checkbox-check" />
          {this.props.label}
        </label>
        {this.state.invalid && this.state.errors.length && (
          <label className="e-checkbox--error" htmlFor={this.state.id}>
            {this.state.errors.map(error => (
              <span key={error}>{'errors.field.' + error}</span>
            ))}
          </label>
        )}
      </div>
    );
  }
}
