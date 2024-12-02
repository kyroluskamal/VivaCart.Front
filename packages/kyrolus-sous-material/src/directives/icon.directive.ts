import { Directive, HostBinding, input } from '@angular/core';
import { IconType } from '../directives/icon.types';

@Directive({
  selector: '[ksIcon]',
})
export class IconDirective {
  ksIcon = input.required<string>();
  iconType = input<IconType>('bi');
  @HostBinding('class') get class() {
    switch (this.iconType()) {
      case 'fa':
      case 'fas':
      case 'fal':
      case 'far':
      case 'fab':
      case 'fad':
        return `${this.iconType()} fa-${this.ksIcon()}`;
      case 'bi':
        return `bi bi-${this.ksIcon()}`;
      case 'google':
        return `material-icons ${this.ksIcon()}`;
      default:
        return `bi bi-${this.ksIcon()}`;
    }
  }
}
