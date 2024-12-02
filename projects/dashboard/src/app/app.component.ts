import { NgOptimizedImage } from '@angular/common';
import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {
  SideNavComponent,
  NavbarModule,
  RendererService,
  SideBarMode,
  DashboardModule,
  ButtonDirective,
  AccordionModule,
  IconDirective,
  CardModule,
  AvatarDirective,
} from 'kyrolus-sous-material';

@Component({
  selector: 'app-root',
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
  ],
  providers: [RendererService],
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'dashboard';
  openSideBar = signal<boolean>(true);
  sidebarMode = signal<SideBarMode>('side');
  sideBarState = signal<boolean>(true);
}
