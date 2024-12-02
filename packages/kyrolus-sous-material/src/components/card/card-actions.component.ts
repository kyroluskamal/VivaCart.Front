import { Component, inject } from '@angular/core';
import { CardComponent } from './card.component';

@Component({
  selector: 'ks-card-actions',
  imports: [],
  template: `<ng-content select="button">jlkjklj</ng-content> `,
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
