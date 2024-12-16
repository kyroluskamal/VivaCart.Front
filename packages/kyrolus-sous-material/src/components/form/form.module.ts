import { NgModule } from '@angular/core';
import { FormComponent } from './form/form.component';
import { InputComponent } from './input.component';

const components = [FormComponent, InputComponent];

@NgModule({
  declarations: [],
  imports: [...components],
  exports: [...components],
})
export class FormModule {}
