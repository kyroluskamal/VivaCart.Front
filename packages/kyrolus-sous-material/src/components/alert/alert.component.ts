import { Component, computed, effect, inject, signal } from '@angular/core';
import { fadeInOut } from './alert.animations';
import { AlertService } from './alert.service';
import { AlertPosition, AlertType } from './alert.types';
import { IconDirective } from '../../directives/icon.directive';
import { ButtonDirective } from '../button/button.directive';
import { ButtonAppearance } from '../button/button.types';

@Component({
  selector: 'ks-alert',
  imports: [IconDirective, ButtonDirective],
  animations: [fadeInOut],

  templateUrl: `./alert.component.html`,
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent {
  private readonly alertService = inject(AlertService);
  private readonly progressValueSignal = signal(100);

  // Connect to service signals
  isVisible = this.alertService.isVisible;

  // Computed values from service config
  title = computed(() => this.alertService.config()?.title ?? '');
  text = computed(() => this.alertService.config()?.text ?? '');
  type = computed(
    () => this.alertService.config()?.type ?? ('info' as AlertType)
  );
  position = computed(
    () => this.alertService.config()?.position ?? ('center' as AlertPosition)
  );
  theme = computed(() => this.alertService.config()?.theme ?? 'light');
  icon = computed(() => this.alertService.config()?.icon);
  showCancelButton = computed(
    () => this.alertService.config()?.showCancelButton ?? false
  );
  confirmButtonText = computed(
    () => this.alertService.config()?.confirmButtonText ?? 'OK'
  );
  cancelButtonText = computed(
    () => this.alertService.config()?.cancelButtonText ?? 'Cancel'
  );
  autoClose = computed(() => this.alertService.config()?.autoClose ?? false);

  progressValue = computed(() => this.progressValueSignal());
  buttonAppearance = computed(() => {
    const appearnce = this.type();
    if (this.type() === 'question') {
      return 'secondary';
    }
    return appearnce as ButtonAppearance;
  });

  constructor() {
    this.progressValueSignal.set(this.alertService.progressValue());
    effect(() => {
      if (this.isVisible() && this.autoClose()) {
        this.progressValueSignal.set(100);
        const duration = this.autoClose() as number;
        const startTime = Date.now();

        const updateProgress = () => {
          const elapsed = Date.now() - startTime;
          const remaining = Math.max(0, 100 * (1 - elapsed / duration));
          this.progressValueSignal.set(remaining);

          if (remaining > 0 && this.isVisible()) {
            requestAnimationFrame(updateProgress);
          } else {
            this.alertService.close(false);
          }
        };

        requestAnimationFrame(updateProgress);
      }
    });
  }

  onConfirm() {
    this.alertService.close(true);
  }

  onCancel() {
    this.alertService.close(false);
  }

  onOverlayClick(event: MouseEvent) {
    if ((event.target as HTMLElement).classList.contains('alert-overlay')) {
      this.alertService.close(false);
    }
  }

  onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      this.alertService.close(false);
    }
  }
}
