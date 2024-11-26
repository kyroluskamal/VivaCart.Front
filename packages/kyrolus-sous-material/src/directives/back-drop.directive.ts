import {
  Directive,
  HostBinding,
  HostListener,
  model,
  output,
} from '@angular/core';

@Directive({
  selector: '[ksBackDrop]',
})
export class BackDropDirective {
  show = model<boolean>(true);
  BackdropClick = output<void>();
  @HostBinding('class.backdrop-show') get _show() {
    return this.show();
  }
  @HostListener('click') onClick() {
    this.BackdropClick.emit();
    this.show.update((x) => !x);
  }
}
