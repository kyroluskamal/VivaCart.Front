import {
  ApplicationRef,
  computed,
  createComponent,
  effect,
  EnvironmentInjector,
  inject,
  Injectable,
  runInInjectionContext,
  signal,
  Type,
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
    component: Type<TComponent> | null,
    config: DialogConfig<TData> = new DialogConfig()
  ): DialogRef<TComponent, TData> {
    const dialogId = this.dialogCounter() + 1;
    this.dialogCounter.set(dialogId);
    const dialogComponentRef = createComponent(DialogComponent, {
      environmentInjector: this.injector,
    });
    let compponentRef = null;
    if (component !== null && component !== undefined)
      compponentRef = createComponent(component, {
        environmentInjector: this.injector,
      });
    dialogComponentRef.instance.contentComponent.set(compponentRef);
    dialogComponentRef.instance.config.set(config);
    dialogComponentRef.instance.id.set(`dialog-${dialogId}`);
    dialogComponentRef.instance.opendProgrammatically.set(true);
    dialogComponentRef.instance.open.set(true);
    this.appRef.attachView(dialogComponentRef.hostView);
    if (this.document.body.append)
      this.document.body.append(dialogComponentRef.location.nativeElement);
    const close = computed(() => {
      dialogComponentRef.instance.open.set(false);
      console.log(dialogComponentRef.instance.result());
      this.closeDialog(dialogComponentRef);

      return dialogComponentRef.instance.result;
    });
    const dialogRef: DialogRef<TComponent, TData> = {
      componentInstance: dialogComponentRef.instance as TComponent,
      afterClosed: computed(() => dialogComponentRef.instance.result()),
      getData: () => config?.data as TData,
    };
    let isClosed = signal(false);
    runInInjectionContext(this.injector, () => {
      effect(() => {
        if (!dialogComponentRef.instance.open()) {
          close();
          isClosed.set(true);
        }
      });
    });

    let _ = computed(() => {
      if (isClosed()) {
        return this.activeDialogs().filter((dialog) => dialog !== dialogRef);
      }
      return this.activeDialogs();
    });
    this.activeDialogs.update((dialogs) => [...dialogs, dialogRef]);

    return dialogRef;
  }

  private closeDialog(componentRef: any) {
    this.appRef.detachView(componentRef.hostView);
    componentRef.destroy();
  }
}
