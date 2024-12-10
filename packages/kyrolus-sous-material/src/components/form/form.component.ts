import { Component, inject, input, model } from '@angular/core';
import { InputAppearance, InputColor, InputSize, KsForm } from './input.types';
import {
  FORM_APPEARANCE,
  FORM_COLOR,
  FORM_SIZE,
} from '../../Tokens/tokens.exports';
import { ErrorStateMatcher, KsErrorStateMatcher } from './error-state-matcher';
import { FormGroup } from '@angular/forms';
import { InputComponent } from './input.component';

@Component({
  selector: 'ks-form',
  imports: [InputComponent],
  template: `
    @if(formConfig()==null){
    <ng-content select="ks-input"></ng-content>
    }@else { @for(conf of formConfig(); track $index){

    <ks-input
      [appearance]="conf.appearance || appearance()"
      [autocomplete]="conf.autocomplete!"
      [color]="conf.color || color()"
      [disabled]="conf.disabled!"
    ></ks-input>
    } }
  `,
  styles: ``,
})
export class FormComponent {
  readonly errorStateMatcher = input<ErrorStateMatcher>(
    new KsErrorStateMatcher()
  );
  readonly appearance = input<InputAppearance>(inject(FORM_APPEARANCE));
  readonly color = input<InputColor>(inject(FORM_COLOR));
  readonly size = input<InputSize>(inject(FORM_SIZE));

  readonly formGroup = model<FormGroup | null>(null);
  readonly formConfig = model<KsForm[] | null>(null);
}
