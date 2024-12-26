import { Component, inject } from '@angular/core';
import { DialogComponent } from 'kyrolus-sous-material';

@Component({
  selector: 'app-test2',
  imports: [],
  templateUrl: './test2.component.html',
  styleUrl: './test2.component.scss',
})
export class Test2Component {
  ngAfterViewChecked(): void {
    console.log(this.dialogRef?.config()?.data);
  }
  dialogRef = inject(DialogComponent, { optional: true });
}
