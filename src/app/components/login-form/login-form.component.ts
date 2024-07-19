import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { UserService } from '../../../services/user-service.service';
import { Router } from '@angular/router';
import { SignInRequest } from '../../../interfaces/signIn-Request';
import { LocalStorageService } from '../../../services/local-storage.service';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})
export class LoginFormComponent {
  signInRequest: SignInRequest = { 
    email: '',
    password: ''
  };

  loginError: string = '';
  loading: boolean = false;

  @Output() loginEvent: EventEmitter<string> = new EventEmitter<string>();

  constructor(private userService: UserService, private localStorageService: LocalStorageService, private router: Router) {}

  onLogin(form: NgForm): void {

    if (form.valid) {
      this.loading = true;
      this.userService.SignInUser(this.signInRequest).subscribe({
        next: response => {
          console.log('Access Granted:', response);
          alert('Welcome back, ' + this.signInRequest.email + '!');

          this.localStorageService.setItem('authToken', response.token);

          this.loading = false;

          this.userService.setUserEmail(this.signInRequest.email);
          this.loginEvent.emit('Welcome!');
          
          form.resetForm();
          this.router.navigate(['/weather']);
        },
        error: error => {
          console.error('Accesso denied', error);
          this.loading = false;
          this.loginError = 'Email or password is incorrect.';
        }
      });
    } else {
      this.loginError = 'Email and password are required.';
    }
  }
}
