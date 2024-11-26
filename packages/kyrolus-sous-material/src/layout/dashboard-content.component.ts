import { Component } from '@angular/core';

@Component({
  selector: 'ks-dashboard-content',
  template: ` <ng-content /> `,
  host: { class: 'h-100 w-100 m-6 dashboard-animation d-flex' },
  styles: [],
})
export class DashboardContentComponent {}
