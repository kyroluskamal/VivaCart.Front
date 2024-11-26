import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {
  SideNavComponent,
  NavbarModule,
  RendererService,
  SideBarMode,
  DashboardModule,
} from 'kyrolus-sous-material';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SideNavComponent, NavbarModule, DashboardModule],
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
