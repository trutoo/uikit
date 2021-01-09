export type ValidationExpression<T> = (value: T | undefined) => ValidationResult;

export type ValidationResult = {
  [error: string]: boolean | { [param: string]: any };
} | null;
