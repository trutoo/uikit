import { ValidationExpression, ValidationResult } from './models';

export class Validator<T> {
  private validators: Set<ValidationExpression<T>>;

  constructor(validators?: ValidationExpression<T>[]) {
    this.validators = new Set<ValidationExpression<T>>(validators);
  }

  /* VALIDATORS */

  addValidator(...validator: ValidationExpression<T>[]) {
    const validators = new Set(this.validators);
    validator.forEach((validator) => validators.add(validator));
    return (this.validators = validators);
  }

  removeValidator(...validator: ValidationExpression<T>[]) {
    const validators = new Set(this.validators);
    validator.forEach((validator) => validators.delete(validator));
    return (this.validators = validators);
  }

  replaceValidators(validators: ValidationExpression<T>[]) {
    return (this.validators = new Set(validators));
  }

  validate(value: T | undefined) {
    let result: ValidationResult = {};
    this.validators.forEach((validator) => {
      result = Object.assign(result, validator(value));
    });
    return result ? Object.keys(result) : [];
  }

  private static IsEmpty(value: any) {
    return typeof value === 'undefined' || value === null || value.length === 0;
  }

  /* PRESETS */

  static required(match?: any): ValidationExpression<any> {
    return (value) =>
      (typeof match !== 'undefined' ? value !== match : Validator.IsEmpty(value))
        ? { required: typeof match !== 'undefined' ? match : true }
        : null;
  }

  static min(limit: number): ValidationExpression<number> {
    return (value) => ((value || 0) < limit ? { min: { current: value || 0, expected: limit } } : null);
  }

  static max(limit: number): ValidationExpression<number> {
    return (value) => ((value || 0) > limit ? { max: { current: value || 0, expected: limit } } : null);
  }

  static minLength(limit: number): ValidationExpression<string> {
    return (value) => {
      const length = value ? value.length : 0;
      return length < limit ? { minLength: { current: length, expected: limit } } : null;
    };
  }

  static maxLength(limit: number): ValidationExpression<string> {
    return (value) => {
      const length = value ? value.length : 0;
      return length > limit ? { minLength: { current: length, expected: limit } } : null;
    };
  }

  static pattern(expression: RegExp | string): ValidationExpression<string> {
    let regexp: RegExp;
    let regexStr: string;
    if (typeof expression == 'string') {
      if (expression.charAt(0) !== '^') expression = `^${expression}`;
      if (expression.charAt(expression.length - 1) !== '$') expression += '$';
      regexp = new RegExp(expression);
      regexStr = expression;
    } else {
      regexp = expression;
      regexStr = expression.toString();
    }
    return (value) => (value && regexp.test(value) ? { pattern: { current: value, required: regexStr } } : null);
  }

  /* PATTERNS */

  /** May contain characters `A-Ö 0-9 .-@` and a minimum of 4 and a maximum of 45 characters. */
  static UsernamePattern = /^[\wåäö@.-]{4,45}$/i;

  /** May contain characters `A-Z 0-9 _!?@#$%^&+=` and a minimum of 9 and a maximum of 32 characters.
   * Must contain a number, a capital, and a miniscule.
   */
  static PasswordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[\w!?@#$%^&+=]{9,32}$/;

  /** Must contain 10 digits with a possibility of a hyphen after the first 6 digits. */
  static OrganizationNumberPattern = /^\d{6}-?\d{4}$/;

  /** Must lead with a 1-9 followed by 4 numbers with a possibility of a space after digit 3. */
  static ZipcodePattern = /^[1-9]\d{2} ?\d{2}$/;

  /** May lead with a `+` followed by digits allowing parenthesis, hyphens and spaces. */
  static TelephonePattern = /^\+?[0-9 ]*(\([0-9 ]+\))?[0-9- ]*[0-9]$/;

  /** May contain characters `A-Ö 0-9 -` and space. */
  static TimePattern = /^[0-2]\d[:]\d\d$/i;

  /** May contain characters `A-Ö 0-9 -` and space. */
  static SafePattern = /^[\wåäö ,-]+$/i;

  /** Must contain 4 digits. */
  static PinPattern = /^\d{4,4}$/i;
}
