import {
  Component,
  ComponentRef,
  computed,
  effect,
  ElementRef,
  HostBinding,
  inject,
  input,
  model,
  OnInit,
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
    ButtonDirective,
  ],
  hostDirectives: [
    {
      directive: BackDropDirective,
      inputs: ['zIndex', 'closeByClickOrEsc'],
      outputs: ['BackdropClick'],
    },
  ],
})
export class DialogComponent {
  effect = effect(() => {
    if (this.backdrop.backDropClicked()) {
      this.close();
    }
  });
  document = inject(DOCUMENT);
  elementRef = inject(ElementRef);
  id = model<string>('dialog');
  componentContentType = input<Type<any> | null>(null);
  backdrop = inject(BackDropDirective);
  config = model<DialogConfig>();
  result = signal<any>(null);
  contentComponent = model<ComponentRef<any> | null>(null);
  opendProgrammatically = signal<boolean>(false);
  open = model<boolean>(false);
  freeStyleDialogTemplate = input<TemplateRef<any> | null>(null);
  effec = effect(() => {
    this.backdrop.show.set(this.open());
  });
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

  close(result?: any) {
    this.open.set(false);
    this.backdrop.BackdropClick.emit(true);
    this.result.set(result);
    this.contentComponent()?.destroy();
    this.backdrop.backDropClicked.set(false);
  }
}
