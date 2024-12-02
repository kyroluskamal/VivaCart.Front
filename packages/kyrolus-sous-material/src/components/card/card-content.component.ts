import { Component, inject } from '@angular/core';
import { CardComponent } from './card.component';

@Component({
  selector: 'ks-card-content',
  imports: [],
  template: ` <p>card-content works!</p> `,
  styles: ``,
})
export class CardContentComponent {
  readonly cardContainer = inject(CardComponent);
  ngOnInit(): void {
    if (!this.cardContainer) {
      throw new Error('Card Content must be used inside a Card');
    }
  }
}
