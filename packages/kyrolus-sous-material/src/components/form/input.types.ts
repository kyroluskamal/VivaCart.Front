import { ErrorStateMatcher } from './error-state-matcher';

export type InputColor =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'danger'
  | 'warning'
  | 'success'
  | 'info'
  | 'light'
  | 'dark';
export type InputType =
  | 'text'
  | 'password'
  | 'email'
  | 'number'
  | 'tel'
  | 'url'
  | 'search'
  | 'date'
  | 'time'
  | 'datetime-local'
  | 'month'
  | 'week';
export type InputSize = 'sm' | 'md' | 'lg';
export type InputIcon = 'left' | 'right';
export type InputAppearance =
  | 'outline'
  | `ghost`
  | 'n-horizontal'
  | 'normal-float'
  | 'ghost'
  | 'n-vertical';

export type InputError = {
  errorKey: string;
  errorMessage?: string;
};

export type KsForm = {
  appearance?: InputAppearance;
  color?: InputColor;
  size?: InputSize;
  errorStateMatcher?: ErrorStateMatcher;
  formControlName?: string;
  formGroupName?: string;
  formArrayName?: string;
  min?: number | null;
  max?: number | null;
  minLength?: number | null;
  maxLength?: number | null;
  readonly?: boolean | null;
  required?: boolean;
  disabled?: boolean;
  placeholder?: string | null;
  type?: InputType | null;
  label?: string | null;
  iconleft?: string | null;
  iconright?: string | null;
  errorMessages: InputError[];
  autocomplete?: string | null;
  pattern?: string | null;
};
