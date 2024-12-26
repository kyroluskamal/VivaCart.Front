import {
  ApplicationRef,
  computed,
  createComponent,
  EnvironmentInjector,
  inject,
  Injectable,
  signal,
} from '@angular/core';

import { DialogComponent } from './dialog.component';
import { DialogConfig, DialogRef } from './dialog.types';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  private readonly appRef = inject(ApplicationRef);
  private readonly injector = inject(EnvironmentInjector);
  private readonly activeDialogs = signal<DialogRef[]>([]);
  private readonly dialogCounter = signal(0);
  private readonly document = inject(DOCUMENT);
  readonly dialogCount = computed(() => this.activeDialogs().length);
  open<TComponent = any, TData = any>(
    component: any,
    config?: DialogConfig<TData>
  ): DialogRef<TComponent, TData> {
    const dialogId = this.dialogCounter() + 1;
    this.dialogCounter.set(dialogId);
    const dialogComponentRef = createComponent(DialogComponent, {
      environmentInjector: this.injector,
    });

    const compponentRef = createComponent(component, {
      environmentInjector: this.injector,
    });
    dialogComponentRef.instance.contentComponent.set(compponentRef);
    dialogComponentRef.instance.config.set(config);
    dialogComponentRef.instance.id.set(`dialog-${dialogId}`);
    dialogComponentRef.instance.opendProgrammatically.set(true);

    this.appRef.attachView(dialogComponentRef.hostView);
    if (this.document.body.append)
      this.document.body.append(dialogComponentRef.location.nativeElement);

    const dialogRef: DialogRef<TComponent, TData> = {
      componentInstance: dialogComponentRef.instance as TComponent,
      close: computed(() => {
        this.closeDialog(dialogComponentRef);

        return dialogComponentRef.instance.result;
      }),
      afterClosed: computed(() => dialogComponentRef.instance.result()),

      updatePosition: (position) => {
        // dialogComponentRef.instance.updatePosition(position);
      },
      updateSize: (width, height) => {
        // dialogComponentRef.instance.updateSize(width, height);
      },
      getData: () => config?.data as TData,
    };

    this.activeDialogs.update((dialogs) => [...dialogs, dialogRef]);

    return dialogRef;
  }

  private closeDialog(componentRef: any) {
    this.appRef.detachView(componentRef.hostView);
    componentRef.destroy();
    this.activeDialogs.update((dialogs) =>
      dialogs.filter((d) => d !== componentRef)
    );
  }
}
