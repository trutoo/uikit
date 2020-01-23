import React, { Component, FormEvent, FocusEvent } from 'react';
import { ValidationExpression } from '../../framework/models';
import { Validator } from '../../framework/validator';
import { Icon } from '@trutoo/ui-icons';

interface Props {
  id?: string;
  className?: string;
  name?: string;
  label?: string;
  type?: string;
  value?: string;
  disabled?: boolean;
  helpText?: string;
  validators?: ValidationExpression<string>[];
  inputProps?: { [key: string]: string };
  onChange?: (event: string) => void;
}

interface State {
  id: string;
  invalid: boolean;
  focused: boolean;
  errors: string[];
  showHelp: boolean;
}

export default class TextField extends Component<Props, State> {
  static ALWAYS_FLOATING = ['date', 'time', 'datetime', 'datetime-local'];

  protected validator: Validator<string>;

  constructor(props: Props) {
    super(props);
    window.eid = window.eid || 0;
    this.validator = new Validator(this.props.validators);
    this.state = {
      id: `id-${window.eid++}`,
      invalid: false,
      focused: false,
      errors: [],
      showHelp: false,
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

  onChange = (event: FormEvent<HTMLInputElement>) => {
    if (this.props.onChange) this.props.onChange(event.currentTarget.value);
  };

  onFocusChange = (event: FocusEvent<HTMLInputElement>) => {
    this.setState({ focused: event.type === 'focus' });
  };

  /* HELPERS */

  hasValueOrFocus(): boolean {
    if (this.props.type && TextField.ALWAYS_FLOATING.indexOf(this.props.type) !== -1) return true;
    if (this.state.focused) return true;
    if (this.props.value !== null && this.props.value !== undefined && this.props.value !== '') return true;
    return false;
  }

  /* RENDER */

  render() {
    return (
      <div
        className={
          'tu-textfield ' +
          (this.props.className || '') +
          (this.state.focused ? ' focused' : '') +
          (this.props.disabled ? ' disabled' : '') +
          (this.state.invalid ? ' invalid ' : '')
        }>
        {this.props.label && (
          <label
            className={'tu-textfield--label' + (this.hasValueOrFocus() ? ' floating' : '')}
            htmlFor={this.state.id}>
            {this.props.label}
          </label>
        )}
        <input
          id={this.state.id}
          name={this.props.name}
          className={'tu-textfield--input' + (this.props.label ? ' labelled' : '')}
          type={this.props.type}
          value={this.props.value}
          aria-label={this.props.helpText}
          onChange={this.onChange}
          onFocus={this.onFocusChange}
          onBlur={this.onFocusChange}
          {...this.props.inputProps}
        />
        {this.props.helpText && (
          <Icon
            className={`tu-textfield--description-toggler`}
            id="question"
            tabIndex={0}
            onClick={() => {
              this.setState({ showHelp: !this.state.showHelp });
            }}
          />
        )}
        {this.props.helpText && this.state.showHelp && (
          <label className="tu-textfield--description" htmlFor={this.state.id}>
            {this.props.helpText}
          </label>
        )}
        {this.state.invalid && this.state.errors.length && (
          <label className="tu-textfield--error" htmlFor={this.state.id}>
            {this.state.errors.map(error => (
              <span key={error}>{'errors.field.' + error}</span>
            ))}
          </label>
        )}
      </div>
    );
  }
}
