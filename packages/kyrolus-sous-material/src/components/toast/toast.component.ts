import { Component, effect, inject } from '@angular/core';
import { toastStateAnimation } from './toast.animation';
import { Toast } from './toast.type';
import { ToastService } from './toast.service';
import { IconDirective } from '../../directives/icon.directive';

@Component({
  selector: 'ks-toast',
  animations: [toastStateAnimation],
  imports: [IconDirective],
  templateUrl: `./toast.component.html`,
  styleUrls: ['./toast.component.scss'],
})
export class ToastComponent {
  toastService = inject(ToastService);

  constructor() {
    effect(() => {
      this.toastService.sortedToasts().forEach((toast) => {
        if (!toast.isPaused) {
          setTimeout(() => {
            this.toastService.remove(toast.id);
          }, toast.duration);
        }
      });
    });
  }
  removeToast(toast: Toast) {
    this.toastService.remove(toast.id);
  }

  pauseTimer(toast: Toast) {
    this.toastService.pauseTimer(toast.id);
  }

  resumeTimer(toast: Toast) {
    this.toastService.resumeTimer(toast.id);
  }

  handleAction(toast: Toast) {
    if (toast.actionCallback) {
      toast.actionCallback();
    }
    this.removeToast(toast);
  }
}
