import { Injectable, signal } from '@angular/core';
import { AlertConfig } from './alert.types';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  readonly config = signal<AlertConfig>({});
  readonly isVisible = signal<boolean | null>(false);
  readonly progressValue = signal(100);
  private readonly defaultConfig: AlertConfig = {
    title: '',
    text: '',
    type: 'info',
    position: 'center',
    theme: 'light',
    iconType: 'bi',
    showCancelButton: false,
    cancelButtonText: 'Cancel',
    autoClose: false,
  };

  show(config: AlertConfig) {
    this.config.set({ ...this.defaultConfig, ...config });
    this.isVisible.set(true);
  }
  update(config: Partial<AlertConfig>) {
    this.config.update((x) => ({ ...x, ...config }));
  }
  close(result: boolean | null) {
    this.isVisible.set(null);
  }

  success(
    text: string,
    title: string = 'Success',
    config: Partial<AlertConfig> = {
      cancelButtonText: 'Close',
      autoClose: 2000,
      icon: 'check-circle',
    }
  ) {
    this.show({
      ...this.defaultConfig,
      ...config,
      text,
      title,
      type: 'success',
    });
  }

  error(
    text: string,
    title: string = 'Error',
    config: Partial<AlertConfig> = {
      cancelButtonText: 'Close',
      icon: 'x-circle',
    }
  ) {
    this.show({ ...config, text, title, type: 'danger' });
  }

  warning(
    text: string,
    title: string = 'Warning',
    config: Partial<AlertConfig> = {
      cancelButtonText: 'Close',
      confirmButtonText: 'OK',
      icon: 'exclamation-triangle',
    }
  ) {
    this.show({
      ...this.defaultConfig,
      ...config,
      text,
      title,
      type: 'warning',
    });
  }

  info(
    text: string,
    title?: string,
    config: Partial<AlertConfig> = {
      autoClose: 5000,
      cancelButtonText: 'Close',
      icon: 'info-circle',
    }
  ) {
    this.show({ ...this.defaultConfig, ...config, text, title });
  }

  question(
    text: string,
    title?: string,
    config: Partial<AlertConfig> = {
      showCancelButton: true,
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel',
      icon: 'question-circle',
    }
  ) {
    this.show({
      ...this.defaultConfig,
      ...config,
      text,
      title,
      type: 'question',
    });
  }
}
