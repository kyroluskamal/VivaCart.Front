import {
  computed,
  Directive,
  HostBinding,
  HostListener,
  inject,
  input,
} from '@angular/core';
import {
  ButtonAppearance,
  ButtonSize,
  ButtonVariant,
} from '../button/button.types';
import {
  BUTTON_BORDER_RADIUS_CLASS,
  BUTTON_IS_RAISED,
  BUTTON_RAISE_CLASS,
} from '../../Tokens/button.tokens';

@Directive({
  selector: '[ksButton]',
})
export class ButtonDirective {
  readonly size = input<ButtonSize>('med');
  readonly variant = input<ButtonVariant>('solid');
  readonly appearance = input<ButtonAppearance>('primary');
  readonly isRaised = input<boolean>(inject(BUTTON_IS_RAISED));
  readonly BorderRadius = input(inject(BUTTON_BORDER_RADIUS_CLASS));
  readonly disabled = input<boolean>(false);
  readonly RaisedClass = input(inject(BUTTON_RAISE_CLASS));
  classes = computed(() =>
    [
      'd-inline-flex',
      'f-align-items-center',
      'f-justify-content-center',
      'br-none',
      'cursor-pointer',
      'btn',
      this.BorderRadius(),
      `btn${
        this.variant() !== 'solid' ? '-' + this.variant() : ''
      }-${this.appearance()}`,
      `btn-${this.size()}`,
      `${this.isRaised() ? this.RaisedClass() : 'elevation-0'}`,
    ]
      .filter(Boolean)
      .join(' ')
  );
  @HostBinding('class')
  get class(): string {
    return this.classes();
  }
  @HostListener('click', ['$event'])
  onClick(event: MouseEvent): void {
    if (this.disabled()) {
      event.preventDefault();
    }
  }

  @HostBinding('attr.disabled')
  get disabledAttr(): boolean | null {
    return this.disabled() ? true : null;
  }
}
