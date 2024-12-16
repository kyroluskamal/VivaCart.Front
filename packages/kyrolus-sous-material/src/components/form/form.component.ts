import { Component, inject, input, model } from '@angular/core';
import { InputAppearance, InputColor, InputSize, KsForm } from './input.types';
import {
  FORM_APPEARANCE,
  FORM_COLOR,
  FORM_SIZE,
} from '../../Tokens/tokens.exports';
import { ErrorStateMatcher, KsErrorStateMatcher } from './error-state-matcher';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormRecord,
  ReactiveFormsModule,
} from '@angular/forms';
import { InputComponent } from './input.component';
import { FormService } from './form.service';
import { IconDirective } from '../../directives/icon.directive';
import { PrefixDirective } from '../../directives/prefix.directive';
import { SuffixDirective } from '../../directives/suffix.directive';
import { NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'ks-form',
  imports: [
    InputComponent,
    ReactiveFormsModule,
    IconDirective,
    PrefixDirective,
    SuffixDirective,
    NgTemplateOutlet,
  ],
  providers: [
    {
      provide: FormService,
      useFactory: () => new FormService(),
    },
  ],
  template: `
    @if(formConfig().length>0 && formRecord() !== null){

    <ng-container [formGroup]="formRecord()!">
      @for(conf of formConfig(); track $index){ @if( !['g',
      'a'].includes(conf.controlType ?? 'c') ){
      <ks-input
        [appearance]="conf?.appearance ?? appearance()"
        [autocomplete]="conf?.autocomplete ?? 'off'"
        [disable]="conf?.disabled ?? null"
        [color]="conf?.color ?? color()"
        [errorMessages]="conf?.errorMessages ?? []"
        [errorStateMatcher]="conf?.errorStateMatcher ?? errorStateMatcher()"
        [formControlName]="conf?.formControlName!"
        [label]="conf.label ?? ''"
        [maxlength]="conf?.maxLength ?? null"
        [max]="conf?.max ?? null"
        [minlength]="conf?.minLength ?? null"
        [min]="conf?.min ?? null"
        [pattern]="conf?.pattern ?? ''"
        [placeholder]="conf?.placeholder ?? null"
        [readonly]="conf?.readonly ?? false"
        [required]="conf?.required ?? false"
        [size]="conf?.size ?? size()"
        [type]="conf?.type ?? 'text'"
      >
        @if(conf.iconLeft ){
        <span
          ksPrefix
          [ksIcon]="conf.iconLeft.iconName"
          [iconType]="conf.iconLeft.iconType"
        >
          @if(conf?.iconLeft?.iconType && conf?.iconLeft?.iconType !=='google'){
          {{ conf?.iconLeft?.iconName }}
          }
        </span>

        } @if(conf.iconRight ){
        <span
          ksSuffix
          [ksIcon]="conf.iconRight.iconName"
          [iconType]="conf.iconRight.iconType"
        >
          @if(conf?.iconRight?.iconType && conf?.iconRight?.iconType
          !=='google'){
          {{ conf?.iconLeft?.iconName }}
          }
        </span>
        }
      </ks-input>
      }<!-- End !['g', 'a'].includes(conf.controlType ?? 'c') -->
      <!-- If controlType === 'a' -->
      @else if(conf.controlType === 'g'){

      <!-- Internal Form Group -->
      @if(conf.internalFormGroup){
      <!-- If template -->
      @if(!conf.template){
      <!-- If htmlSeparator -->
      @if(conf.htmlSeparator){
      <div class="d-contents" [innerHTML]="conf.htmlSeparator!"></div>
      <ng-container [formGroupName]="conf.formGroupName!">
        <ks-form
          [color]="color()"
          [size]="size()"
          [errorStateMatcher]="errorStateMatcher()"
          [appearance]="conf?.appearance ?? appearance()"
          [formRecord]="getFormRecord(conf.formGroupName!)"
          [formConfig]="conf.internalFormGroup!"
        ></ks-form>
      </ng-container>
      }@else if(conf.fieldSetLegend){
      <fieldset class="p-5 br-r-3">
        <legend>{{ conf.fieldSetLegend }}</legend>
        <ng-container [formGroupName]="conf.formGroupName!">
          <ks-form
            [color]="color()"
            [size]="size()"
            [errorStateMatcher]="errorStateMatcher()"
            [appearance]="conf?.appearance ?? appearance()"
            [formRecord]="getFormRecord(conf.formGroupName!)"
            [formConfig]="conf.internalFormGroup!"
          ></ks-form>
        </ng-container>
      </fieldset>
      }@else {
      <ng-container [formGroupName]="conf.formGroupName!">
        <ks-form
          [color]="color()"
          [size]="size()"
          [errorStateMatcher]="errorStateMatcher()"
          [appearance]="conf?.appearance ?? appearance()"
          [formRecord]="getFormRecord(conf.formGroupName!)"
          [formConfig]="conf.internalFormGroup!"
        ></ks-form>
      </ng-container>
      } }<!-- End !conf.template -->
      @else {
      <ng-container [ngTemplateOutlet]="conf.template"></ng-container>

      }<!-- If template -->
      }<!-- End conf.internalFormGroup -->
      }<!-- End conf.controlType === 'g' -->

      @else{ @if(conf.htmlSeparator){
      <div class="d-contents" [innerHTML]="conf.htmlSeparator!"></div>
      } @if(conf.template){
      <ng-container [ngTemplateOutlet]="conf.template"></ng-container>
      }@else {
      <ng-container [formArrayName]="conf.formArrayName!">
        @let formArray = getFormArrray(conf.formArrayName!);
         
        <!-- formArray loop -->
        @for(c of formArray.controls; track $index; let i = $index){
        <ng-container [formGroupName]="i">
          <ks-form
            [color]="color()"
            [size]="size()"
            [errorStateMatcher]="errorStateMatcher()"
            [appearance]="conf?.appearance ?? appearance()"
            [formRecord]="
              getFormRecordByIndexFromFormArray(conf.formArrayName!, i)
            "
            [formConfig]="conf.internalFormGroup!"
          ></ks-form>
        </ng-container>
        }
      </ng-container>

      } } }
      <!-- End !['g', 'a'].includes(conf.controlType ?? 'c') -->
    </ng-container>

    }@else {
    <ng-content select="ks-input"></ng-content>
    }

    <ng-template #defaultTemplate> </ng-template>
  `,
  styles: ``,
})
export class FormComponent {
  readonly formService = inject(FormService);
  readonly fb = inject(FormBuilder);
  readonly errorStateMatcher = input<ErrorStateMatcher>(
    new KsErrorStateMatcher()
  );
  readonly appearance = input<InputAppearance>(inject(FORM_APPEARANCE));
  readonly color = input<InputColor>(inject(FORM_COLOR));
  readonly size = input<InputSize>(inject(FORM_SIZE));

  readonly formRecord = model<FormRecord<FormControl | FormGroup> | null>(null);
  readonly formConfig = input<KsForm[]>([]);
  constructor() {}
  ngOnInit() {
    this.formService.Parent = this;
    this.formRecord.update((record) => {
      return this.createForm(this.formConfig(), record!);
    });

    console.log(this.formConfig());
  }
  getFormRecord(formGroupName: string) {
    return this.formRecord()?.get(formGroupName) as FormRecord<
      FormControl | FormRecord
    >;
  }
  getFormArrray(formArrayName: string) {
    return this.formRecord()?.get(formArrayName) as FormArray;
  }
  getFormRecordByIndexFromFormArray(formArrayName: string, index: number) {
    return this.getFormArrray(formArrayName).at(index) as FormRecord<
      FormControl | FormRecord
    >;
  }
  createForm(conf: KsForm[], record: FormRecord<FormControl | FormGroup>) {
    conf.forEach((c) => {
      if (!['g', 'a'].includes(c.controlType ?? 'c')) {
        record.addControl(
          c.formControlName!,
          this.fb.control(
            {
              value: c.defaultValue ?? null,
              disabled: c.disabled,
            },
            c.validators
          )
        );
      } else if (c.controlType === 'g' && !c.template) {
        if (c.internalFormGroup)
          record.addControl(c.formGroupName!, this.fb.record({}));
      } else if (c.controlType === 'g' && c.template) {
        record.addControl(
          c.formGroupName!,
          this.createForm(c.internalFormGroup!, this.fb.record({}))
        );
      }
    });
    return record;
  }
}
