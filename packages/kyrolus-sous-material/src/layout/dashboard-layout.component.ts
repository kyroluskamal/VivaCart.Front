import {
  Component,
  computed,
  contentChildren,
  effect,
  input,
  model,
  signal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { SideBarMode } from '../helpers/types';
import { NgTemplateOutlet } from '@angular/common';
import { BackDropDirective } from '../directives/back-drop.directive';
import { DashboardContentComponent } from './dashboard-content.component';
import { SideNavComponent } from '../components/side-nav.component';

@Component({
  selector: 'ks-dashboard-layout',
  imports: [NgTemplateOutlet, BackDropDirective, DashboardContentComponent],
  template: `
    <div
      ksBackDrop
      [zIndex]="1"
      [show]="hasBackdrop() && showBackdrop()"
      (BackdropClick)="backdropClick($event)"
    ></div>
    @if(sidebarMode()== 'side'){
    <ng-container [ngTemplateOutlet]="sidebar" />
    <div class="d-flex flex-column w-100 h-100">
      <ng-container [ngTemplateOutlet]="navbar" />
      <ng-container [ngTemplateOutlet]="dashboardContent" />
    </div>
    } @else {
    <ng-container [ngTemplateOutlet]="navbar" />
    <div
      class="d-flex flex-row w-100 h-100 position-relative + {{
        contentClases()
      }}"
    >
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
      :host(:has(ks-side-nav + div)) div {
        will-change: transform;
        transition:
          padding var(--transition-duration) var(--transition-easing),
          transform var(--transition-duration) var(--transition-easing),
          margin var(--transition-duration) var(--transition-easing);
      }
  `,
  host: {
    class: 'w-100 h-100 d-flex flex-column position-relative',
  },
})
export class DashboardLayoutComponent {
  contentClases = input<string>('');
  sidenavs = contentChildren(SideNavComponent);
  sidebarMode = input<SideBarMode>('side');
  hasBackdrop = input<boolean>(true);
  showBackdrop = model<boolean>(true);
  sideNavIsOpened = effect(() => {});
  backdropClick(event: boolean) {
    this.sidenavs().forEach((sidebav) => {
      sidebav.open.set(!event);
    });
  }
}
