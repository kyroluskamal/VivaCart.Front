import {
  Component,
  ComponentRef,
  ElementRef,
  HostBinding,
  inject,
  input,
  model,
  output,
  signal,
  TemplateRef,
  Type,
  ViewEncapsulation,
} from '@angular/core';
import { BackDropDirective } from '../../directives/back-drop.directive';
import { DialogConfig } from './dialog.types';
import { DOCUMENT, NgComponentOutlet, NgTemplateOutlet } from '@angular/common';
import { fadeInOut } from '../../animations/animations.export';
import { DialogHeaderComponent } from './dialog-header.component';
import { DialogActionsComponent } from './dialog-actions.component';
import { DialogContentComponent } from './dialog-content.component';
import { DialogTitleDirective } from './dialog-title.directive';
import { ButtonDirective } from '../button/button.directive';
import { DialogService } from './dialog.service';
import { DraggableDirective } from '../../directives/draggable.directive';

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
  ],
})
export class DialogComponent {
  document = inject(DOCUMENT);
  elementRef = inject(ElementRef);
  id = model<string>('dialog');
  componentContentType = input<Type<any> | null>(null);
  config = model<DialogConfig<any>>(new DialogConfig());
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
}
