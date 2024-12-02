import { Component, inject } from '@angular/core';
import { CardComponent } from './card.component';

@Component({
  selector: 'ks-card-actions',
  imports: [],
  template: ` <p>card-actions works!</p> `,
  styles: ``,
})
export class CardActionsComponent {
  readonly cardContainer = inject(CardComponent);

  ngOnInit(): void {
    if (!this.cardContainer) {
      throw new Error('Card Actions must be used inside a Card');
    }
  }
}
