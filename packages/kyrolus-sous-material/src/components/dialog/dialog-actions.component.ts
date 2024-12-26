import { Component } from '@angular/core';

@Component({
  selector: 'ks-dialog-actions',
  imports: [],
  template: ` <ng-content select="[ksButton]"></ng-content> `,
  host: { class: 'dialog-footer' },
  styles: ``,
})
export class DialogActionsComponent {}
