import { Component, input } from '@angular/core';
import { SideBarMode } from '../helpers/types';
import { NgTemplateOutlet } from '@angular/common';
import { BackDropDirective } from '../directives/back-drop.directive';
import { DashboardContentComponent } from './dashboard-content.component';

@Component({
  selector: 'ks-dashboard-layout',
  imports: [NgTemplateOutlet, BackDropDirective, DashboardContentComponent],
  template: `
    <div ksBackDrop [show]="hasBackdrop() && showBackdrop()"></div>
    @if(sidebarMode()== 'side'){
    <ng-container [ngTemplateOutlet]="sidebar" />
    <div class="d-flex flex-column w-100 h-100">
      <ng-container [ngTemplateOutlet]="navbar" />
      <ng-container [ngTemplateOutlet]="dashboardContent" />
    </div>
    } @else {
    <ng-container [ngTemplateOutlet]="navbar" />
    <div class="d-flex flex-row w-100 h-100 position-relative">
      <ng-container [ngTemplateOutlet]="sidebar" />
      <ng-container [ngTemplateOutlet]="dashboardContent" />
    </div>
    }

    <ng-template #navbar>
      <ng-content select="ks-navbar-container" />
    </ng-template>

    <ng-template #sidebar>
      <ng-content select="ks-side-nav" />
    </ng-template>

    <ng-template #dashboardContent>
      <ng-content select="ks-dashboard-content" />
    </ng-template>
  `,
  styles: `

  `,
  host: {
    class:
      'w-100 h-100 d-flex flex-column overflow-x-hidden dashboard-animation',
  },
})
export class DashboardLayoutComponent {
  contentClases = input<string>('');
  sidebarMode = input<SideBarMode>('side');
  hasBackdrop = input<boolean>(true);
  showBackdrop = input<boolean>(true);
}
