import {
  Directive,
  HostBinding,
  HostListener,
  input,
  model,
  output,
} from '@angular/core';

@Directive({
  selector: '[ksBackDrop]',
  host: { class: 'position-fixed w-100 h-100' },
})
export class BackDropDirective {
  show = model<boolean>(true);
  closeByClickOrEsc = input<boolean>(true);
  BackdropClick = output<boolean>();
  zIndex = input<number>(9999);
  @HostBinding('class') get _show() {
    if (this.show())
      return 'backdrop-show position-fixed w-100 h-100 top-0 left-0';
    return 'd-none';
  }

  @HostBinding('style.z-index') get _zIndex() {
    return this.zIndex();
  }
  @HostListener('click')
  @HostListener('keydown.esc')
  onClick() {
    if (this.closeByClickOrEsc()) {
      this.BackdropClick.emit(true);
      this.show.update((x) => !x);
    } else {
      this.BackdropClick.emit(false);
    }
  }
}
