import { Component } from '@angular/core';

@Component({
  selector: 'ks-card',
  imports: [],
  template: `
    <ng-content select="ks-card-header">Add Header</ng-content>
    <ng-content select="[ksCardImage]" />
    <ng-content select="ks-card-content">
      <div
        class="w-100 h-100 d-flex flex-row f-justify-content-center f-align-items-center br-s-dashed br-c-gray"
      >
        Add Content
      </div>
    </ng-content>

    <ng-content select="ks-card-footer"></ng-content>
    <ng-content select="ks-card-actions">
      <div
        class="d-flex flex-row f-justify-content-center f-align-items-center br-s-dashed br-c-gray"
      >
        Add Only Buttons
      </div>
    </ng-content>
  `,
  styles: ``,
  host: {
    class:
      'd-flex flex-column bg-white elevation-2 br-r-3 p-19 w-100 h-100 gap-3',
  },
})
export class CardComponent {}
