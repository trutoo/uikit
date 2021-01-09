import '@trutoo/ui-core/dist/framework/core';

import React, { Component, createRef, KeyboardEvent, MouseEvent } from 'react';

import scrollIntoView from 'scroll-into-view-if-needed';

import {
  Grid,
  ValidationExpression,
  Validator,
} from '@trutoo/ui-core';
import { Icon } from '@trutoo/ui-icons';

import { Utilities } from './Utilities';

export interface DateValue {
  date: Date | undefined;
  secondaryDate?: Date;
}

interface Props {
  id?: string;
  className?: string;
  name?: string;
  label?: string;
  value?: DateValue | undefined;
  /** The placeholder text shown in text field */
  placeholder?: string;
  description?: string;
  disabled?: boolean;
  clearText?: string;
  scrollOffset?: number;
  /** Determines if date picker allows picking a past date */
  enablePastDates?: boolean;
  /** Determines if date picker allows picking a date span */
  span?: boolean;
  /** Determines the length of the weekday labels */
  weekday?: 'long' | 'short' | 'tiny';
  validators?: ValidationExpression<DateValue>[];
  inputProps?: { [key: string]: string };
  onChange?: (event: DateValue | undefined) => void;
}

interface State {
  id: string;
  invalid: boolean;
  focused: boolean;
  days: string[];
  dates: Date[];
  focusedDate: Date;
  errors: string[];
}

export default class Datepicker extends Component<Props, State> {
  protected inputRef = createRef<HTMLInputElement>();
  protected dateRefs: { [timestamp: number]: HTMLSpanElement | null } = {};
  protected validator: Validator<DateValue>;

  /** @internal today's date */
  protected todaysDate: Date;

  protected selectingSpan = false;

  constructor(props: Props) {
    super(props);
    this.todaysDate = new Date();
    this.todaysDate.setHours(0, 0, 0, 0);
    this.validator = new Validator(props.validators);

    const start = this.props.value ? this.props.value.date : undefined;
    const end = this.props.value ? this.props.value.secondaryDate : undefined;
    const focusedDate = new Date((this.props.span && end) || start || this.todaysDate);
    focusedDate.setHours(0, 0, 0, 0);

    this.state = {
      id: '',
      invalid: false,
      focused: false,
      days: this.genDays(this.props.weekday),
      dates: this.genDates(this.todaysDate),
      focusedDate,
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
    if (this.props.value !== prevProps.value) {
      const start = this.props.value ? this.props.value.date : undefined;
      const end = this.props.value ? this.props.value.secondaryDate : undefined;
      if (this.props.span && end) this.focusDate(end);
      else if (start) this.focusDate(start);
      this.updateValidity(this.props.value);
    }
    if (this.props.weekday !== prevProps.weekday) this.setState({ days: this.genDays(this.props.weekday) });
  }

  //------------------------------------------------------------------------------------
  // DATEPICKER INTERACTIONS
  //------------------------------------------------------------------------------------

  private onSelectDate = (event: MouseEvent<HTMLElement>, date: Date) => {
    event.preventDefault();
    this.selectDate(date);
    if (this.inputRef.current) this.inputRef.current.focus();
  };

  private onChangeMonth = (event: MouseEvent<SVGElement>, steps: number) => {
    event.preventDefault();
    const focus = new Date(this.state.focusedDate);
    const dayCount = Utilities.daysInMonth(focus.getMonth() + steps, focus.getFullYear());
    focus.setDate(Math.min(focus.getDate(), dayCount));
    focus.setMonth(this.state.focusedDate.getMonth() + steps);
    this.focusDate(focus);
    if (this.inputRef.current) this.inputRef.current.focus();
  };

  /**
   * Enter selects the active value, arrows changes index and esc clears the field.
   * @param event fired containing which key was released
   */
  private onKeyDown = (event: KeyboardEvent) => {
    const skip = (event: KeyboardEvent, count: number) => {
      const date = new Date(this.state.focusedDate);
      date.setDate(date.getDate() + count);
      if (!this.isDateEnabled(date)) return;
      event.preventDefault();
      this.focusDate(date);
    };

    switch (event.keyCode || event.which) {
      case 13: // Enter - Select the currently chosen value
      case 32: // Space - Select the currently chosen value
        event.preventDefault();
        this.selectDate(this.state.focusedDate);
        break;
      case 37: // Arrow Left - Increment on step in the calendar
        skip(event, -1);
        break;
      case 38: // Arrow Up - Increment on step in the calendar
        skip(event, -7);
        break;
      case 39: // Arrow Right - Decrement on step in the calendar
        skip(event, 1);
        break;
      case 40: // Arrow Down - Decrement on step in the calendar
        skip(event, 7);
        break;
      case 27: // Escape - Clear the result and value of the typeahead, resetting it
        this.onClear();
        break;
    }
    return true;
  };

  /**
   * Triggered when the datepickers focus function is called.
   */
  private onFocus = () => {
    this.setState({ focused: true }, () => {
      this.scrollToDate(this.state.focusedDate.getTime());
    });
  };

  /**
   * Triggered when the datepickers blur function is called. If a value was pressed, it is selected.
   * Resets focus and clears the result list.
   */
  private onBlur = () => {
    this.setState({
      focused: false,
    });
  };

  /**
   * Resets the typeaheads value and result list.
   */
  private onClear = () => {
    this.updateModel();
    if (this.inputRef.current) this.inputRef.current.focus();
  };

  //------------------------------------------------------------------------------------
  // ACTIONS
  //------------------------------------------------------------------------------------

  /**
   * Selects a DateValue value for our Datepicker.
   * @param model The DateValue we want to select.
   */
  private updateModel(model?: DateValue) {
    if (this.props.onChange) this.props.onChange(Object.assign({ date: undefined }, model));
  }

  updateValidity(value: DateValue | undefined) {
    const errors = this.validator.validate(value);
    this.setState({ errors, invalid: !!errors.length });
  }

  selectDate(date: Date) {
    if (!this.isDateEnabled(date)) return;
    const prevDate = this.props.value ? this.props.value.date : undefined;
    let model: DateValue;

    if (
      (this.props.span && !this.selectingSpan) ||
      (this.props.span && this.selectingSpan && prevDate && date < prevDate)
    ) {
      model = { date };
      this.selectingSpan = true;
    } else if (this.props.value && this.props.span && this.selectingSpan) {
      model = { date: prevDate, secondaryDate: date };
      this.selectingSpan = false;
    } else {
      model = { date };
      this.selectingSpan = false;
    }

    this.focusDate(date);
    this.updateModel(model);
  }

  focusDate(date: Date) {
    if (!Utilities.isSameMonth(date, this.state.focusedDate)) this.setState({ dates: this.genDates(date) });

    this.setState({ focusedDate: date });
    this.scrollToDate(date.getTime());
  }

  //------------------------------------------------------------------------------------
  // CHECKS
  //------------------------------------------------------------------------------------

  private isDateSelected(date: Date | undefined): boolean {
    const start = this.props.value ? this.props.value.date : undefined;
    const end = this.props.value ? this.props.value.secondaryDate : undefined;
    return !!(
      (start && Utilities.isMatchingDates(date, start)) ||
      (this.props.span && end && Utilities.isMatchingDates(date, end))
    );
  }

  private isDateEnabled(date: Date): boolean {
    if (this.props.enablePastDates) return true;
    if (date < this.todaysDate) return false;
    return true;
  }

  private isDateInSpan(date: Date): boolean {
    if (!this.props.span || !this.props.value || !this.props.value.date || !this.props.value.secondaryDate)
      return false;
    if (date < this.props.value.date || date > this.props.value.secondaryDate) return false;
    return true;
  }

  //------------------------------------------------------------------------------------
  // HELPERS
  //------------------------------------------------------------------------------------

  private hasValueOrFocus(): boolean {
    if (this.state.focused) return true;
    if (this.props.value !== null && this.props.value !== undefined && this.props.value.date) return true;
    return false;
  }

  private formatInput(model: DateValue | undefined) {
    if (!model || !model.date) return '';
    // Span is not enabled
    if (!this.props.span) return Utilities.natural(model.date);
    // Span is enabled and dates are the same or no secondary date set
    else if (!model.secondaryDate || Utilities.isMatchingDates(model.date, model.secondaryDate))
      return Utilities.naturalShort(model.date);
    // Span is enabled and dates don't match
    else return `${Utilities.naturalShort(model.date)} - ${Utilities.naturalShort(model.secondaryDate)}`;
  }

  private genDays(weekday: 'long' | 'short' | 'tiny' | undefined) {
    switch (weekday) {
      default:
      case 'long':
        return Utilities.weekdays();
      case 'short':
        return Utilities.weekdaysShort();
      case 'tiny':
        return Utilities.weekdaysMin();
    }
  }

  private genDates(date: Date): Date[] {
    const dates = [];
    date = new Date(date);
    date.setDate(1);
    const day = date.getDay();

    // Rewind the date a number of days so that the calendar view dates are put in the correct position.
    // The Date() counts Sunday as the first day in the week, by adding 1 we change this to monday.
    if (day > 1) {
      date.setDate(date.getDate() - day + 1);
    } else if (day === 1) {
      //If the first is a monday we want to have an empty week as the first
      date.setDate(date.getDate() - 7);
    } else {
      //If the first day is a Sunday we need to rewind 6 days due to Swedish calendarweek format.
      date.setDate(date.getDate() - 6);
    }

    while (dates.length < 42) {
      dates.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    return dates;
  }

  private genDateState(date: Date) {
    const states = {
      dimmed: !Utilities.isSameMonth(date, this.state.focusedDate),
      disabled: !this.isDateEnabled(date),
      today: Utilities.isMatchingDates(date, this.todaysDate),
      span: this.isDateInSpan(date),
      focused: this.isDateEnabled(date) && Utilities.isMatchingDates(date, this.state.focusedDate),
    };
    return Object.entries(states).reduce(
      (classNames, [state, enabled]) => (enabled ? `${classNames} ${state}` : classNames),
      '',
    );
  }

  /**
   * Scrolls focused result into view with a specified offset.
   * @param [timestamp=0] the timestamp which to scroll to
   */
  private scrollToDate(timestamp = 0) {
    const resultRef = this.dateRefs[timestamp];
    const offset = this.props.scrollOffset || 24;
    if (resultRef) {
      let delta = window.scrollY || document.documentElement.scrollTop;
      scrollIntoView(resultRef, {
        scrollMode: 'if-needed',
        block: 'nearest',
      });
      delta -= window.scrollY || document.documentElement.scrollTop;
      if (delta) window.scrollBy(0, delta > 0 ? -offset : offset);
    }
  }

  //------------------------------------------------------------------------------------
  // RENDER
  //------------------------------------------------------------------------------------

  renderHelper() {
    if (this.props.disabled) {
      return <Icon id="calendar" className="tu-datepicker--helper no-events" />;
    }

    if (this.props.value !== null && this.props.value !== undefined && this.props.value.date) {
      return (
        <Icon
          id="calendar-clear"
          className="tu-datepicker--helper"
          tabIndex={-1}
          title={this.props.clearText || 'Clear'}
          onClick={this.onClear}
        />
      );
    }

    return <Icon id="calendar" className="tu-datepicker--helper no-events" />;
  }

  render() {
    // Reset date refs on render
    this.dateRefs = {};
    return (
      <div
        className={
          'tu-datepicker ' +
          (this.props.className || '') +
          (this.state.focused ? ' focused' : '') +
          (this.props.disabled ? ' disabled' : '') +
          (this.state.invalid ? ' invalid ' : '')
        }
        onKeyDown={this.onKeyDown}>
        {this.props.label && (
          <label
            id={`${this.state.id}-label`}
            className={`tu-datepicker--label ${this.hasValueOrFocus() ? 'floating' : ''}`}
            htmlFor={this.state.id}>
            {this.props.label}
          </label>
        )}

        <input
          role="listbox"
          ref={this.inputRef}
          id={this.state.id}
          name={this.props.name}
          className={`tu-datepicker--input ${this.props.label ? 'labelled' : ''}`}
          type={'text'}
          value={this.formatInput(this.props.value)}
          placeholder={this.props.placeholder}
          readOnly={true}
          aria-readonly={true}
          aria-label={this.props.description}
          aria-controls={`${this.state.id}-results`}
          aria-autocomplete="list"
          aria-expanded={!!this.state.dates.length}
          aria-activedescendant={`${this.state.id}-result-${this.state.focusedDate.getTime()}`}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          {...this.props.inputProps}
        />

        {this.renderHelper()}

        {this.state.dates && (
          <Grid className="tu-datepicker--select" columns={7} id={`${this.state.id}-results`}>
            {/* PREVIOUS */}
            <svg className="tu-datepicker--select-button" onMouseDown={(event) => this.onChangeMonth(event, -1)}>
              <use xlinkHref="#icon-arrow-left-circle" />
            </svg>

            {/* MONTH */}
            <strong className="tu-datepicker--select-month">
              {Utilities.transform(this.state.focusedDate, 'MMMM YYYY').replace(/^\w/, (c) => c.toUpperCase())}
            </strong>

            {/* NEXT */}
            <svg className="tu-datepicker--select-button" onMouseDown={(event) => this.onChangeMonth(event, 1)}>
              <use xlinkHref="#icon-arrow-right-circle" />
            </svg>

            {/* WEEK DAYS */}
            {this.state.days.map((day) => (
              <strong key={day} className="tu-datepicker--select-days">
                {day}
              </strong>
            ))}

            {/* DATES */}
            {this.state.dates.map((date) => {
              const key = date.getTime();
              return (
                <span
                  key={key}
                  ref={(ref) => (this.dateRefs[key] = ref)}
                  className={`tu-datepicker--select-dates ${this.genDateState(date)}`}
                  id={`${this.state.id}-result-${key}`}
                  role="option"
                  tabIndex={-1}
                  onMouseDown={(event) => this.onSelectDate(event, date)}
                  aria-selected={this.isDateSelected(date)}
                  aria-disabled={!this.isDateEnabled(date)}>
                  {Utilities.transform(date, 'D')}
                </span>
              );
            })}
          </Grid>
        )}

        {this.state.invalid && this.state.errors.length && (
          <label className="tu-datepicker--error" htmlFor={this.state.id}>
            {this.state.errors.map((error) => (
              <span key={error}>{'errors.field.' + error}</span>
            ))}
          </label>
        )}
      </div>
    );
  }
}
