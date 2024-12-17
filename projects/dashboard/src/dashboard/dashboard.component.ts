import { Component, inject, signal } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import {
  SideNavComponent,
  NavbarModule,
  DashboardModule,
  ButtonDirective,
  AccordionModule,
  IconDirective,
  CardModule,
  AvatarDirective,
  SideBarMode,
  AlertService,
} from 'kyrolus-sous-material';
@Component({
  selector: 'app-dashboard',
  imports: [
    RouterOutlet,
    ButtonDirective,
    SideNavComponent,
    NavbarModule,
    DashboardModule,
    AccordionModule,
    IconDirective,
    AvatarDirective,
    NgOptimizedImage,
    CardModule,
    RouterLinkActive,
    RouterLink,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  openSideBar = signal<boolean>(true);
  sidebarMode = signal<SideBarMode>('side');
  sideBarState = signal<boolean>(true);

  alertService = inject(AlertService);
  openAlert() {
    this.alertService.success('This is a success alert');
  }
}
