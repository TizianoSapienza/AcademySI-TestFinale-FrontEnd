import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from '../services/user-service.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) {}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (this.userService.isAuthenticated()) {
      return true; //Utente autenticato, consente accesso
    } else {
      window.alert('Per accedere a questa pagina è necessario effettuare il login.');
      
      this.router.navigate(['/login']);
      return false; //Utente non autenticato
    }
  }
}