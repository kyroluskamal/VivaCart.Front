import { Component, inject } from '@angular/core';
import { CardHeaderComponent } from './card-header.component';

@Component({
  selector: 'ks-card-title',
  imports: [],
  template: ` <p>card-title works!</p> `,
  styles: ``,
})
export class CardTitleComponent {
  readonly cardHeader = inject(CardHeaderComponent);
  ngOnInit(): void {
    if (!this.cardHeader) {
      throw new Error('Card Title must be used inside a Card Header');
    }
  }
}
