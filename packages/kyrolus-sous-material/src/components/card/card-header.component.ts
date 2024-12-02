import { Component, inject, OnInit } from '@angular/core';
import { CardComponent } from './card.component';

@Component({
  selector: 'ks-card-header',
  imports: [],
  template: ` <p>card-header works!</p> `,
  styles: ``,
})
export class CardHeaderComponent implements OnInit {
  readonly cardContainer = inject(CardComponent);
  ngOnInit(): void {
    if (!this.cardContainer) {
      throw new Error('Card Header must be used inside a Card');
    }
  }
}
