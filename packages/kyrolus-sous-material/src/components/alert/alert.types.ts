import { IconType } from '../../directives/icon.types';

export type AlertType = 'success' | 'danger' | 'warning' | 'info' | 'question';
export type AlertPosition =
  | 'top'
  | 'top-start'
  | 'top-end'
  | 'center'
  | 'bottom'
  | 'bottom-start'
  | 'bottom-end';

export interface AlertConfig {
  title?: string;
  text?: string;
  type?: AlertType;
  position?: AlertPosition;
  theme?: 'light' | 'dark';
  icon?: string;
  iconType?: IconType;
  showCancelButton?: boolean;
  confirmButtonText?: string;
  cancelButtonText?: string;
  autoClose?: number | false;
}
