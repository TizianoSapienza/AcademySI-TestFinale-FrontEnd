import { Routes } from '@angular/router';
import { RegisterFormComponent } from './components/register-form/register-form.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { WeatherComponent } from './components/weather/weather.component';
import { LandingComponent } from './components/landing/landing.component';
import { AuthGuard } from '../guards/Auth-guard';

export const routes: Routes = [
  {path: '', component: LandingComponent, title: 'Weather App | Home'},
  {path: 'login', component: LoginFormComponent, title: 'Weather App | Login'},
  {path: 'register', component: RegisterFormComponent, title: 'Weather App | Register'},
  {path: 'weather', component: WeatherComponent, title: 'Weather App | Search', canActivate: [AuthGuard]},
];