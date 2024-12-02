import {
  Component,
  computed,
  effect,
  HostBinding,
  HostListener,
  inject,
} from '@angular/core';
import {
  GoogleIconDirective,
  IconDirective,
} from '../../directives/directives.export';
import { AccordionItemComponent } from './accordion-item.component';
import { AccordionContainerComponent } from './accordion-container.component';

@Component({
  selector: 'ks-accordion-header',
  imports: [IconDirective],

  template: `
    <div ksIcon="house"></div>
    <span class="d-flex flex-1">
      <ng-content>Add header here</ng-content>
    </span>
    <div ksIcon="chevron-right"></div>
  `,
  host: {
    class:
      'br-r-3 cursor-pointer d-flex justify-content-start align-items-center p-5 gap-3',
  },
  styles: `
    :host:nth-child(2) {
      flex:1
    }
  `,
})
export class AccordionHeaderComponent {
  readonly accortionContainer = inject(AccordionContainerComponent);
  readonly accortionItem = inject(AccordionItemComponent);
  readonly opened = computed<boolean>(() => this.accortionItem.opened());
  ngOnInit(): void {
    if (!this.accortionItem) {
      throw new Error('Accordion Header must be used inside an Accordion Item');
    }
  }
  @HostListener('click')
  toggle() {
    this.accortionItem.opened.set(!this.accortionItem.opened());
    this.accortionContainer.theOpenedItem.set(this.accortionItem);
  }

  @HostBinding('class.opened')
  @HostBinding('attr.opened')
  get _opened(): boolean {
    return this.opened();
  }
}
