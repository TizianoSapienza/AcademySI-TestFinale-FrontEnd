import { Component } from '@angular/core';
import { UserService } from '../../../services/user-service.service';
import { Router } from '@angular/router';
import { SignUpRequest } from '../../../interfaces/signUp-Request';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.css'
})
export class RegisterFormComponent {

  signUpRequest: SignUpRequest = {
    username: '',
    email: '',
    password: '',
  }

  passwordsMatch: boolean = true;
  passwordStrength: string = '';

  constructor(private userService: UserService, private router: Router) {}

  onRegister(form: NgForm): void {

    if (form.valid) {
      this.userService.SignUpUser(this.signUpRequest).subscribe({
        next: response => {
          console.log('User registered successfully:', response);
          form.resetForm();
          this.router.navigate(['/login']);
        },
        error: error => {
          console.error('Registration failed:', error);
        }
      });
    }
  }

  assessPasswordStrength(password: string): void {
    const strength = this.calculatePasswordStrength(password);
    this.passwordStrength = strength;
  }

  private calculatePasswordStrength(password: string): string {
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[a-z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[\W]/.test(password)) strength += 1;

    switch (strength) {
      case 0:
      case 1:
      case 2:
        return 'Weak';
      case 3:
        return 'Moderate';
      case 4:
      case 5:
        return 'Strong';
      default:
        return '';
    }
  }
}
