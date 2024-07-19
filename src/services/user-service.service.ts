import { Injectable } from '@angular/core';
import { environment } from '../environments/environments';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { SignUpRequest } from '../interfaces/signUp-Request';
import { BehaviorSubject, catchError, Observable, retry, tap, throwError } from 'rxjs';
import { SignInRequest } from '../interfaces/signIn-Request';
import { SignInResponse } from '../interfaces/signIn-Response';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userEmailSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
  userEmail$: Observable<string | null> = this.userEmailSubject.asObservable();

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private localStorageService: LocalStorageService) {
    // Carica l'email dell'utente se esiste un token
    const token = this.localStorageService.getItem('authToken');
    if (token) {
      this.userEmailSubject.next(this.localStorageService.getItem('userEmail')); 
    }
  }

  SignUpUser(user: SignUpRequest): Observable<SignUpRequest> {
    const headers = { 'content-type': 'application/json' };
    return this.http.post<SignUpRequest>(`${this.apiUrl}/user/register`, user, { headers }).pipe(
      retry(2),
      catchError(this.handleError)
    );
  }

  SignInUser(user: SignInRequest): Observable<SignInResponse> {
    const headers = { 'content-type': 'application/json' };
    return this.http.post<SignInResponse>(`${this.apiUrl}/user/login`, user, { headers }).pipe(
      retry(2),
      catchError(this.handleError),
      tap(response => {
        this.localStorageService.setItem('authToken', response.token);
        this.setUserEmail(user.email);
      })
    );
  }

  SignOutUser(): void {
    this.localStorageService.removeItem('authToken');
    this.setUserEmail(null); // Pulisce l'email dell'utente
  }

  isAuthenticated(): boolean {
    const token = this.localStorageService.getItem('authToken');
    // Verifica se il token esiste e se è valido
    return !!token;
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      console.error(`Backend returned code ${error.status}, body was: `, error.error);
    }
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

  setUserEmail(email: string | null): void {
    this.userEmailSubject.next(email);
    if (email) {
      this.localStorageService.setItem('userEmail', email);
    } else {
      this.localStorageService.removeItem('userEmail');
    }
  }

  getUserEmail(): Observable<string | null> {
    return this.userEmailSubject.asObservable();
  }
}
