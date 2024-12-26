import { AfterViewChecked, Component, inject } from '@angular/core';
import { DialogComponent, DialogService } from 'kyrolus-sous-material';
import { Test2Component } from '../test2/test2.component';

@Component({
  selector: 'app-test',
  imports: [],
  templateUrl: './test.component.html',
  styleUrl: './test.component.scss',
})
export class TestComponent implements AfterViewChecked {
  ngAfterViewChecked(): void {
    console.log(this.dialogRef?.config()?.data);
  }
  dialogService = inject(DialogService);
  dialogRef = inject(DialogComponent, { optional: true });

  closeDialog() {
    this.dialogRef?.close(22222);
  }

  openDialog() {
    this.dialogService.open(Test2Component, { data: 'test data2' });
  }
}
