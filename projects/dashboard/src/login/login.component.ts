import { NgOptimizedImage } from '@angular/common';
import { Component, HostBinding, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  CardComponent,
  fontFamilies,
  IconDirective,
  InputComponent,
  PrefixDirective,
  SuffixDirective,
  FormComponent,
} from 'kyrolus-sous-material';

@Component({
  selector: 'app-login',
  imports: [
    CardComponent,
    NgOptimizedImage,
    InputComponent,
    ReactiveFormsModule,
    PrefixDirective,
    SuffixDirective,
    IconDirective,
    FormComponent,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
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

  ngOnInit() {
    this.form.valueChanges.subscribe((value) => {
      console.log(this.form.controls.username.errors);
      console.log(this.form.controls.age.errors);
    });
  }

  @HostBinding('class')
  class = 'w-100 h-100 bg-grey-37 d-flex flex-row';
}
