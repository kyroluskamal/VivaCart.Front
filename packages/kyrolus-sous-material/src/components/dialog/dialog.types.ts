import { Signal, TemplateRef } from '@angular/core';
import { Draggable } from '../../public-api';

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

export class DialogConfig<T = any> {
  id?: string;
  width?: string;
  height?: string;
  position?: DialogPosition = 'center';
  data?: T;
  title?: string;
  draggable: Draggable = { isDraggable: false, reset: false };
  resizable?: boolean = false;
  maximizable?: boolean = false;
  minimizable?: boolean = false;
  fullscreen?: boolean = false;
  freeStyleDialogTemplate?: TemplateRef<any> | null = null;
  closeOnEscape?: boolean = true;
  closeOnBackdropClick?: boolean = true;
  zIndex?: number = 99999;
  panelClass?: string | string[] = '';
  hasBackdrop?: boolean = false;
  backdropClass?: string = '';
  autoFocus?: boolean = false;
  restoreFocus?: boolean = true;
  headerTemplate?: string | TemplateRef<any> = '';
  contentTemplate: TemplateRef<any> | null = null;
  footerTemplate?: string | TemplateRef<any> = '';
  closeButtonText?: string = 'Close';
  useActionButton?: boolean = true;
  actionButtonText?: string = 'Ok';
}
export interface DialogRef<TComponent = any, Tdata = any> {
  afterClosed: Signal<any>;
  getData: () => Tdata;
  componentInstance: TComponent;
}
