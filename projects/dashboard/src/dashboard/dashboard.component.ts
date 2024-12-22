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
  ToastService,
  DialogComponent,
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
    DialogComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  host: { class: 'position-relative' },
})
export class DashboardComponent {
  openSideBar = signal<boolean>(true);
  sidebarMode = signal<SideBarMode>('side');
  sideBarState = signal<boolean>(true);

  alertService = inject(AlertService);
  openAlert() {
    this.alertService.success('This is a success alert', "You've done it!", {
      autoClose: 5000,
    });
  }

  private readonly toastService = inject(ToastService);

  showSuccess() {
    this.toastService.success('Success', 'Operation completed successfully!', {
      isPaused: false,
    });
  }

  showError() {
    this.toastService.error('Error', 'Something went wrong. Please try again.');
  }

  showInfo() {
    this.toastService.info('Info', 'Your files are being processed.');
  }

  showWarning() {
    this.toastService.warning('Warning', 'Your session will expire soon.');
  }

  // showWithAction() {
  //   this.toastService.show(
  //     'Retry Required',
  //     'Failed to save changes.',
  //     'error',
  //     10000,
  //     'high',
  //     'Retry',
  //     () => {
  //       console.log('Retry action clicked');
  //       this.toastService.show(
  //         'Success',
  //         'Changes saved successfully!',
  //         'success',
  //         3000,
  //         'high'
  //       );
  //     }
  //   );
  // }
}
