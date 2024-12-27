import {
  AfterViewInit,
  Component,
  ComponentRef,
  ElementRef,
  HostBinding,
  HostListener,
  inject,
  input,
  model,
  output,
  signal,
  TemplateRef,
  Type,
  viewChild,
  ViewEncapsulation,
} from '@angular/core';
import { BackDropDirective } from '../../directives/back-drop.directive';
import { DialogConfig } from './dialog.types';
import { NgComponentOutlet, NgTemplateOutlet } from '@angular/common';
import { fadeInOut } from '../../animations/animations.export';
import { DialogHeaderComponent } from './dialog-header.component';
import { DialogActionsComponent } from './dialog-actions.component';
import { DialogContentComponent } from './dialog-content.component';
import { DialogTitleDirective } from './dialog-title.directive';
import { ButtonDirective } from '../button/button.directive';
import { DialogService } from './dialog.service';
import { DraggableDirective } from '../../directives/draggable.directive';
import { ResizableDirective } from '../../directives/resizable.directive';
import { DIALOG_DEFAULT_CONFIG } from './dialog.tokens';

@Component({
  selector: 'ks-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
  animations: [fadeInOut],
  encapsulation: ViewEncapsulation.None,
  imports: [
    NgComponentOutlet,
    NgTemplateOutlet,
    DialogHeaderComponent,
    DialogActionsComponent,
    DialogContentComponent,
    DialogTitleDirective,
    BackDropDirective,
    ButtonDirective,
    DraggableDirective,
    ResizableDirective,
  ],
})
export class DialogComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    this.elementRef.nativeElement.focus();
  }
  dialogRef = viewChild('dialog', { read: ElementRef });
  elementRef = inject(ElementRef);
  id = model<string>('dialog');
  componentContentType = input<Type<any> | null>(null);
  config = model<DialogConfig<any>>(inject(DIALOG_DEFAULT_CONFIG));
  result = signal<any>(null);
  contentComponent = model<ComponentRef<any> | null>(null);
  opendProgrammatically = signal<boolean>(false);
  open = model<boolean>(false);
  onBackdropClick = output<boolean>();
  freeStyleDialogTemplate = input<TemplateRef<any> | null>(null);
  dialogService = inject(DialogService);
  @HostBinding('class')
  get dialogClass() {
    return [
      this.config()?.position ?? 'center',
      this.config()?.width == 'full' ? 'full' : '',
    ];
  }
  @HostBinding('attr.id')
  get Id() {
    return this.id();
  }
  toTemplateRef(ele: any) {
    return ele as TemplateRef<any>;
  }
  backdropClicked(event: boolean) {
    if (this.config()?.hasBackdrop && this.config().closeOnBackdropClick) {
      this.close();
      this.onBackdropClick.emit(event);
    }
  }
  close(result?: any) {
    this.open.set(false);
    this.result.set(result);
    this.contentComponent()?.destroy();
  }
  @HostBinding('tabindex') get tabIndex() {
    return -1;
  }
  @HostListener('keydown.esc')
  onEscClick() {
    this.elementRef.nativeElement.focus();

    if (this.config()?.closeOnEscape) {
      this.close();
    }
  }
}
