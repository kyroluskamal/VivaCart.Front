import { Component, inject } from '@angular/core';
import { CardHeaderComponent } from './card-header.component';

@Component({
  selector: 'ks-card-title',
  imports: [],
  template: ` <ng-content>Add Title</ng-content> `,
  styles: ``,
  host: { class: 'fsi-3 fw-bold' },
})
export class CardTitleComponent {
  readonly cardHeader = inject(CardHeaderComponent);
  ngOnInit(): void {
    if (!this.cardHeader) {
      throw new Error('Card Title must be used inside a Card Header');
    }
  }
}
