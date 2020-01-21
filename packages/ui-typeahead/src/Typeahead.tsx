import React, { Component, FormEvent, KeyboardEvent, createRef } from 'react';
import { Icon } from '@trutoo/ui-icons';
import { Validator, ValidationExpression } from '@trutoo/ui-core';
import scrollIntoView from 'scroll-into-view-if-needed';

export type TypeaheadResult = {
  id: string;
  view: string;
};

export interface TypeaheadService<T extends TypeaheadResult = TypeaheadResult> {
  search: (query: string) => Promise<T[] | void>;
}

interface Props<T extends TypeaheadResult = TypeaheadResult> {
  id?: string;
  className?: string;
  name?: string;
  label?: string;
  type?: string;
  value?: T | undefined;
  placeholder?: string;
  description?: string;
  readonly?: boolean;
  disabled?: boolean;
  inline?: boolean;
  clearText?: string;
  scrollOffset?: number;
  resultHeight?: number;
  searchOnFocus?: boolean;
  debounce?: number;
  service: TypeaheadService<T>;
  validators?: ValidationExpression<T>[];
  inputProps?: { [key: string]: string };
  onChange?: (event: T | undefined) => void;
}

interface State<T extends TypeaheadResult = TypeaheadResult> {
  id: string;
  invalid: boolean;
  focused: boolean;
  active: number;
  loading: boolean;
  results: T[];
  errors: string[];
}

export default class Typeahead<T extends TypeaheadResult = TypeaheadResult> extends Component<Props<T>, State<T>> {
  static ALWAYS_FLOATING = ['date', 'time', 'datetime', 'datetime-local'];

  protected inputRef = createRef<HTMLInputElement>();
  protected resultRefs: (HTMLLIElement | null)[] = [];
  protected reqIndex = 0;
  protected debounceTimer: number | undefined;
  protected validator: Validator<T>;

  protected allowFill = false;
  protected cachedInput = '';

  constructor(props: Props<T>) {
    super(props);
    window.eid = window.eid || 0;
    this.validator = new Validator(props.validators);
    this.state = {
      id: `id-${window.eid++}`,
      invalid: false,
      focused: false,
      active: -1,
      loading: false,
      results: [],
      errors: [],
    };
  }

  componentDidMount() {
    this.updateValidity(this.props.value);
  }

  componentDidUpdate(prevProps: Props<T>) {
    if (!Object.is(this.props.validators, prevProps.validators))
      this.validator.replaceValidators(this.props.validators || []);
    if (this.props.value !== prevProps.value) this.updateValidity(this.props.value);
  }

  //------------------------------------------------------------------------------------
  // TYPEAHEAD INTERACTIONS
  //------------------------------------------------------------------------------------

  /**
   * Arrow up or down are used to navigate in the typeahead result.
   * @param event fired containing which key was pressed
   */
  onKeyDown = (event: KeyboardEvent) => {
    switch (event.keyCode || event.which) {
      case 13: // Enter - Disable form submission
        event.preventDefault();
        event.stopPropagation();
        return false;

      case 38: // ArrowUp - Disable moving to start of text
      case 40: // ArrowDown - Disable moving to end of text
        event.preventDefault();
        event.stopPropagation();
        return false;
    }
    return true;
  };

  /**
   * Enter selects the active value, arrows changes index and esc clears the field.
   * @param event fired containing which key was released
   */
  onKeyUp = (event: KeyboardEvent) => {
    let active = -1;

    switch (event.keyCode || event.which) {
      case 13: // Enter - Select the currently chosen value
        if (!this.state.results.length) return;

        if (this.state.active >= 0) {
          if (!this.props.inline) this.updateModel(this.state.results[this.state.active]);
          this.setState({
            active: -1,
            results: [],
          });
        }
        break;

      case 38: // ArrowUp - Move up one step in the typeahead result list
        if (!this.state.results.length) return;

        if (this.state.active > 0) active = this.state.active - 1;
        else if (this.state.active === 0) active = this.state.results.length - 1;
        if (this.props.inline) this.updateModel(this.state.results[active]);
        this.setState({ active });
        this.scrollToResult(active);
        break;

      case 40: // ArrowDown - Move down one step in the typeahead result list
        if (!this.state.results.length) return;

        if (this.state.results.length > this.state.active + 1) active = this.state.active + 1;
        else if (this.state.active === this.state.results.length - 1) active = 0;
        if (this.props.inline) this.updateModel(this.state.results[active]);
        this.setState({ active });
        this.scrollToResult(active);
        break;

      case 27: // Escape - Clear the result and value of the typeahead, resetting it
        this.onClear();
        break;
    }
  };

  /**
   * Triggers a typeahead search
   * @param event Used to find our current search query value
   */
  onChange = (event: FormEvent<HTMLInputElement>) => {
    if (this.props.disabled) return;
    if (event.currentTarget.value.length <= this.cachedInput.length) this.allowFill = false;
    else this.allowFill = true;
    this.updateModel({ view: event.currentTarget.value } as T);
    this.cachedInput = event.currentTarget.value;
    clearTimeout(this.debounceTimer);
    this.debounceTimer = window.setTimeout(this.search.bind(this, event.currentTarget.value), this.props.debounce);
  };

  /**
   * Triggered when the typeaheads focus function is called.
   */
  onFocus = () => {
    this.setState({ focused: true });
    if (this.props.searchOnFocus) {
      this.search(this.props.value ? this.props.value.view : '', true);
    }
  };

  /**
   * Triggered when the typeaheads blur function is called. If a value was pressed, it is selected.
   * Resets focus and clears the result list.
   */
  onBlur = () => {
    this.setState({
      focused: false,
    });
    if (this.state.results.length && this.state.active >= 0) {
      this.updateModel(this.state.results[this.state.active]);
      this.setState({
        active: -1,
        results: [],
      });
    }
  };

  /**
   * Resets the typeaheads value and result list.
   */
  onClear = () => {
    this.updateModel();
    if (this.inputRef.current) this.inputRef.current.focus();
  };

  /**
   * Scrolls focused result into view with a specified offset.
   * @param [index=0] the result index which to scroll to
   */
  scrollToResult(index = 0) {
    const resultRef = this.resultRefs[index];
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
  // RESULT INTERACTIONS
  //------------------------------------------------------------------------------------

  /**
   * Sets the activeIndex to the location of the ITravelLocation value sent to this method.
   * @param value The ITravelLocation to select
   */
  onResultClick = (value: T) => {
    this.updateModel(value);
    this.setState({
      active: -1,
      results: [],
    });
  };

  //------------------------------------------------------------------------------------
  // HELPERS
  //------------------------------------------------------------------------------------

  /**
   * Searches for our value in our typeahead result service provider.
   * @param query Our query to search for in our typeahead service.
   * @param allowBlank Allows overriding null queries to perform search
   */
  search(query: string, allowBlank = false) {
    if (!this.props.service) throw 'Typeahead service must exist and implement ITypeaheadService';

    /* Don't run autocomplete if query is empty */
    if (!query && !allowBlank) {
      this.updateModel();
      this.setState({ results: [] });
      return;
    }

    this.setState({
      active: this.props.inline ? 0 : -1,
      loading: true,
    });

    // Store deletion state before search
    const allowFill = this.allowFill;
    const reqIndex = ++this.reqIndex;
    this.props.service
      .search(query)
      .then(results => {
        // If service can't be reached and error is caught result will be void
        if (!results) return;
        const result = results[0];
        this.setState({ results });

        if (this.props.inline && result && allowFill && reqIndex === this.reqIndex) {
          this.updateModel(result);
          setTimeout(() => {
            if (this.inputRef.current) this.inputRef.current.setSelectionRange(query.length, result.view.length);
          });
        }
      })
      .finally(() => {
        this.setState({ loading: false });
      });
  }

  /**
   * Selects a ITravelLocation value for our Typeahead.
   * @param state The ITravelLocation we want to select.
   */
  private updateModel(state?: T) {
    if (this.props.onChange) this.props.onChange(Object.assign({ id: '', view: '' }, state));
  }

  updateValidity(value: T | undefined) {
    const errors = this.validator.validate(value);
    this.setState({ errors, invalid: !!errors.length });
  }

  hasValueOrFocus(): boolean {
    if (this.props.type && Typeahead.ALWAYS_FLOATING.indexOf(this.props.type) !== -1) return true;
    if (this.state.focused) return true;
    if (this.props.value !== null && this.props.value !== undefined && this.props.value.view !== '') return true;
    return false;
  }

  hasFocusAndResult(): boolean {
    if (this.state.focused && this.state.results.length) return true;
    return false;
  }

  //------------------------------------------------------------------------------------
  // RENDER
  //------------------------------------------------------------------------------------

  renderHelper() {
    if (this.state.loading) {
      return (
        <Icon
          id="loader"
          className="tu-typeahead--helper"
          tabIndex={-1}
          title={this.props.clearText || 'Clear'}
          onClick={this.onClear}
        />
      );
    }

    if (this.props.disabled || !this.state.focused) {
      return <Icon id="arrows-vertical" className="tu-typeahead--helper no-events" />;
    }

    if (!this.props.readonly && this.hasValueOrFocus()) {
      return (
        <Icon
          id="close"
          className="tu-typeahead--helper"
          tabIndex={-1}
          title={this.props.clearText || 'Clear'}
          onClick={this.onClear}
        />
      );
    }
  }

  render() {
    // Reset result refs on render
    this.resultRefs.length = 0;
    return (
      <div
        className={
          'tu-typeahead ' +
          (this.props.className || '') +
          (this.state.focused ? ' focused' : '') +
          (this.props.disabled ? ' disabled' : '') +
          (this.state.invalid ? ' invalid ' : '')
        }
        aria-busy={this.state.loading}
        onKeyDown={this.onKeyDown}
        onKeyUp={this.onKeyUp}>
        <div
          className="tu-typeahead--wrapper"
          role="combobox"
          id={this.state.id + '-combobox'}
          aria-expanded={this.hasFocusAndResult()}
          aria-owns={this.state.id + '-results'}
          aria-haspopup="listbox">
          {this.props.label && (
            <label
              id={this.state.id + '-label'}
              className={'tu-typeahead--label' + (this.hasValueOrFocus() ? ' floating' : '')}
              htmlFor={this.state.id}>
              {this.props.label}
            </label>
          )}

          <input
            ref={this.inputRef}
            id={this.state.id}
            name={this.props.name}
            className={'tu-typeahead--input' + (this.props.label ? ' labelled' : '')}
            type={this.props.type || 'search'}
            value={this.props.value ? this.props.value.view : ''}
            placeholder={this.props.placeholder}
            readOnly={this.props.readonly}
            autoComplete="off"
            aria-readonly={this.props.readonly}
            aria-label={this.props.description}
            aria-autocomplete={this.props.inline ? 'both' : 'list'}
            aria-controls={this.state.id + '-results'}
            aria-activedescendant={this.state.active >= 0 ? this.state.id + '-result-' + this.state.active : undefined}
            onChange={this.onChange}
            onFocus={this.onFocus}
            onBlur={this.onBlur}
            {...this.props.inputProps}
          />
          {this.renderHelper()}
        </div>

        <ul
          id={this.state.id + '-results'}
          role="listbox"
          className="tu-typeahead--results"
          aria-labelledby={this.state.id + '-label'}
          aria-hidden={!this.hasFocusAndResult()}
          style={{ maxHeight: this.props.resultHeight ? `${this.props.resultHeight}rem` : undefined }}>
          {this.state.results.map((result, i) => (
            <li
              ref={ref => (this.resultRefs[i] = ref)}
              id={this.state.id + '-result-' + i}
              className="tu-typeahead--results-item"
              role="option"
              key={result.id}
              aria-selected={result == this.state.results[this.state.active]}
              onMouseDown={this.onResultClick.bind(this, result)}>
              {result.view}
            </li>
          ))}
        </ul>

        {this.state.invalid && this.state.errors.length && (
          <label className="tu-typeahead--error" htmlFor={this.state.id}>
            {this.state.errors.map(error => (
              <span key={error}>{'errors.field.' + error}</span>
            ))}
          </label>
        )}
      </div>
    );
  }
}
