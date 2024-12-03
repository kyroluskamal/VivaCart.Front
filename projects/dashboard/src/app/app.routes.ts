import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { DashboardComponent } from '../dashboard/dashboard.component';

export const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
  },
  {
    path: 'login',
    loadComponent: () =>
      import('../login/login.component').then((m) => m.LoginComponent),
  },
];
