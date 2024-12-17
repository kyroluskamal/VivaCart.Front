import { NgOptimizedImage } from '@angular/common';
import {
  AfterViewInit,
  Component,
  HostBinding,
  inject,
  signal,
  TemplateRef,
  viewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormRecord,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  CardComponent,
  fontFamilies,
  FormModule,
  KsForm,
} from 'kyrolus-sous-material';

@Component({
  selector: 'app-login',
  imports: [CardComponent, NgOptimizedImage, ReactiveFormsModule, FormModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    this.formRecord.update((x) => {
      x.get('email')?.setValue('dsdsaddsas');
      return x;
    });
    this.formRecord().controls['password'].disable();
    this.formConfig.update((x) => {
      x[4].template = this.temp();

      return x;
    });
  }

  temp = viewChild<TemplateRef<any>>('address');
  fb = inject(FormBuilder);
  fontsConst = fontFamilies;
  form = this.fb.group({
    username: [
      '',
      [Validators.required, Validators.maxLength(20), Validators.minLength(3)],
    ],
    password: [null, [Validators.required, Validators.minLength(8)]],
    email: [null, [Validators.email]],
    age: [
      null,
      [Validators.required, Validators.min(100), Validators.max(120)],
    ],
  });
  getAddressFg() {
    const addressControl = this.formRecord().get('address');
    if (addressControl instanceof FormRecord) {
      return addressControl;
    }
    throw new Error('Address control is not a FormGroup');
  }
  formRecord = signal<FormRecord<FormControl<string | null>>>(
    this.fb.record({})
  );

  formConfig = signal<KsForm[]>([
    {
      formControlName: 'username',
      label: 'Username',
      placeholder: 'Enter your username',
      order: 0,
      defaultValue: 'admin',
      iconRight: { iconType: 'bi', iconName: 'house' },
      disabled: true,
      validators: [Validators.required],
    },
    {
      formControlName: 'password',
      label: 'Password',
      placeholder: 'Enter your password',
      order: 1,
      validators: [Validators.required],
    },
    {
      formControlName: 'email',
      label: 'Email',
      placeholder: 'Enter your email',
      order: 3,
      validators: [Validators.required, Validators.email],
    },
    {
      formControlName: 'age',
      type: 'number',
      label: 'Age',
      placeholder: 'Enter your age',
      order: 2,
      validators: [
        Validators.required,
        Validators.min(100),
        Validators.max(120),
      ],
    },

    {
      formGroupName: 'address',
      controlType: 'g',
      order: 4,
      fieldSetLegend: 'Address',
      template: this.temp(),
      // htmlSeparator:
      //   '<div class="d-flex flex-row f-align-items-center">Address <hr class="flex-1 br-none br-w-t-1 br-s-solid br-c-grey" ></div>',
      internalFormGroup: [
        {
          formControlName: 'street',
          controlType: 'c',
          type: 'text',
          label: 'street',
          placeholder: 'Enter your street name',
          order: 0,
          validators: [],
        },
      ],
    },
  ]);
  ngOnInit() {
    this.formRecord().valueChanges.subscribe(console.log);
  }

  @HostBinding('class')
  class = 'w-100 h-100 bg-grey-37 d-flex flex-row';
}
