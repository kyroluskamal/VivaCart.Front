import {
  Component,
  effect,
  inject,
  Injector,
  runInInjectionContext,
  signal,
  viewChild,
} from '@angular/core';
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
  DialogService,
  DialogRef,
  DialogModule,
  DialogConfig,
} from 'kyrolus-sous-material';
import { TestComponent } from '../test/test.component';
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
    DialogModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  host: { class: 'position-relative' },
})
export class DashboardComponent {
  testComp = TestComponent;
  openSideBar = signal<boolean>(true);
  sidebarMode = signal<SideBarMode>('side');
  sideBarState = signal<boolean>(true);
  dialogService = inject(DialogService);
  dialogRef = signal<DialogRef>({} as DialogRef);
  alertService = inject(AlertService);
  showdilaog = signal<boolean>(false);
  dialog = viewChild(DialogComponent);

  intector = inject(Injector);
  opendialog = signal<boolean>(true);
  dialogCondig = signal(new DialogConfig());
  openAlert() {
    this.showdilaog.set(true);
    const dialogConfig = new DialogConfig();
    dialogConfig.data = 'test data';
    dialogConfig.title =
      'This is the title of this dialog this is should be long';
    dialogConfig.isMinimizable = true;
    dialogConfig.isMinimized = false;
    this.dialogRef.set(this.dialogService.open(TestComponent, dialogConfig));

    runInInjectionContext(this.intector, () => {
      effect(() => {
        console.log(this.dialogRef().afterClosed());
      });
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
