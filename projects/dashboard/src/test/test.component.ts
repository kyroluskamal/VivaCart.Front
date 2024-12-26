import { AfterViewChecked, Component, inject } from '@angular/core';
import {
  DialogComponent,
  DialogConfig,
  DialogService,
} from 'kyrolus-sous-material';
import { Test2Component } from '../test2/test2.component';

@Component({
  selector: 'app-test',
  imports: [],
  templateUrl: './test.component.html',
  styleUrl: './test.component.scss',
})
export class TestComponent implements AfterViewChecked {
  ngAfterViewChecked(): void {
    this.dialogRef?.result.set(22222);
  }
  dialogService = inject(DialogService);
  dialogRef = inject(DialogComponent, { optional: true });

  closeDialog() {
    this.dialogRef?.result.set(22222);
  }

  openDialog() {
    const dialogConfig = new DialogConfig<string>();
    dialogConfig.data = 'test data';
    this.dialogService.open(Test2Component, dialogConfig);
  }
}
