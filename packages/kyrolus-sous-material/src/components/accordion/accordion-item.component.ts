import {
  Component,
  effect,
  inject,
  input,
  model,
  OnInit,
  signal,
} from '@angular/core';
import { AccordionContainerComponent } from './accordion-container.component';

@Component({
  selector: 'ks-accordion-item',
  imports: [],
  template: `
    <ng-content select="ks-accordion-header" />
    <ng-content select="ks-accordion-content" />
  `,
  host: { class: 'd-flex flex-column' },
  styles: ``,
})
export class AccordionItemComponent implements OnInit {
  container = inject(AccordionContainerComponent);
  readonly opened = signal(false);

  ngOnInit(): void {
    if (!this.container) {
      throw new Error(
        'Accordion Item must be used inside an Accordion Container'
      );
    }
  }
}
