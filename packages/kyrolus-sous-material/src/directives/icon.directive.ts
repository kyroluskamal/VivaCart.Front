import { Directive, HostBinding, input } from '@angular/core';
import { Icon } from '../helpers/types';

@Directive({
  selector: '[ksIcon]',
})
export class IconDirective {
  ksIcon = input.required<string>();
  iconType = input<Icon>({
    type: 'bi',
    icon: 'bi',
  });
  @HostBinding('class') get class() {
    return `${this.iconType().icon} ${this.ksIcon()}`;
  }
}
