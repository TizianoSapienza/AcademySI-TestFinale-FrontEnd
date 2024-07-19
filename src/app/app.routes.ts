import { Routes } from '@angular/router';
import { RegisterFormComponent } from './components/register-form/register-form.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { WeatherComponent } from './components/weather/weather.component';
import { LandingComponent } from './components/landing/landing.component';
import { AuthGuard } from '../guards/Auth-guard';

export const routes: Routes = [
  {path: '', component: LandingComponent},
  {path: 'login', component: LoginFormComponent, title: 'Weather | Login'},
  {path: 'register', component: RegisterFormComponent, title: 'Weather | Register'},
  {path: 'weather', component: WeatherComponent, title: 'Weather | Weather', canActivate: [AuthGuard]},
];