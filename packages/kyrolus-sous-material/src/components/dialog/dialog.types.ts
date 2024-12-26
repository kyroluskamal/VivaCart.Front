import { Signal, TemplateRef } from '@angular/core';

export type DialogPosition =
  | 'top-left'
  | 'top'
  | 'top-right'
  | 'right'
  | 'left'
  | 'bottom-left'
  | 'bottom'
  | 'bottom-right'
  | 'center';

export interface DialogConfig<T = any> {
  id?: string;
  width?: string;
  height?: string;
  position?: DialogPosition;
  data?: T;
  title?: string;
  draggable?: boolean;
  resizable?: boolean;
  maximizable?: boolean;
  minimizable?: boolean;
  fullscreen?: boolean;
  freeStyleDialogTemplate?: TemplateRef<any>;
  backdrop?: boolean | 'static';
  closeOnEscape?: boolean;
  closeOnBackdropClick?: boolean;
  zIndex?: number;
  panelClass?: string | string[];
  hasBackdrop?: boolean;
  backdropClass?: string;
  autoFocus?: boolean;
  restoreFocus?: boolean;
  headerTemplate?: string | TemplateRef<any>;
  contentTemplate?: string | TemplateRef<any>;
  footerTemplate?: string | TemplateRef<any>;
  closeButtonText?: string;
  actionButtonText?: string;
}
export interface DialogRef<TComponent = any, Tdata = any> {
  close: Signal<any>;
  afterClosed: Signal<any>;
  updatePosition: (position: DialogPosition) => void;
  updateSize: (width: string, height: string) => void;
  getData: () => Tdata;
  componentInstance: TComponent;
}
