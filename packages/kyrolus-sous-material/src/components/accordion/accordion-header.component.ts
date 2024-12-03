import {
  Component,
  computed,
  HostBinding,
  HostListener,
  inject,
  input,
} from '@angular/core';
import { IconDirective } from '../../directives/directives.export';
import { AccordionItemComponent } from './accordion-item.component';
import { AccordionContainerComponent } from './accordion-container.component';
import { IconType } from '../../directives/icon.types';

@Component({
  selector: 'ks-accordion-header',
  imports: [IconDirective],

  template: `
    @if(icon!=null || icon!=undefined || icon!=''){

    <div [ksIcon]="icon().icon" [iconType]="icon().type"></div>
    }
    <span class="d-flex flex-1">
      <ng-content>Add header here</ng-content>
    </span>
    @if(!accortionItem.headerOnly()){
    <div ksIcon="chevron-right"></div>
    }
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
  readonly icon = input<{ icon: string; type: IconType }>({
    type: 'bi',
    icon: '',
  });

  readonly ActiveClass = input<string>('accordtion-active');
  readonly opened = computed<boolean>(() => this.accortionItem.opened());
  ngOnInit(): void {
    if (!this.accortionItem) {
      throw new Error('Accordion Header must be used inside an Accordion Item');
    }
  }
  @HostListener('click')
  toggle() {
    if (this.accortionItem.disabled() || this.accortionItem.headerOnly())
      this.accortionItem.opened.set(false);
    else {
      this.accortionItem.opened.set(!this.accortionItem.opened());
      this.accortionContainer.theOpenedItem.set(this.accortionItem);
    }
  }

  @HostBinding('class.opened')
  @HostBinding('attr.opened')
  get _opened(): boolean {
    return this.opened();
  }

  @HostBinding('class')
  get _active(): string {
    return this.opened() ? this.ActiveClass() : '';
  }
}
