import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main-component/main-component';

export const routes: Routes = [
  { path: '', component: MainComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent }
];
