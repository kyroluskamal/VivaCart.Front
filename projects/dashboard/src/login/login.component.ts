import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { CardComponent, fontFamilies } from 'kyrolus-sous-material';

@Component({
  selector: 'app-login',
  imports: [CardComponent, NgOptimizedImage],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  fontsConst = fontFamilies;
}
