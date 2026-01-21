import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = environment.apiUrl;
  private Http = inject(HttpClient);

  isLoggedIn = signal<boolean>(false);

  User = signal<User | undefined>({
    id: '',
    email: '',
    first_name: '',
    last_name: ''
  });

  Login(email: string, password: string): Observable<AuthResponse> {
    return this.Http.post<AuthResponse>(`${this.apiUrl}/auth/login`, { email, password }).pipe(
      tap(()=> this.CurrentUser().subscribe(res=> this.setAuthentication(res)))
    );
  }

  Register(first_name: string, last_name: string, email: string, password: string, phone_number: string) {
    return this.Http.post<AuthResponse>(`${this.apiUrl}/auth/register`, { first_name, last_name, email, password, phone_number });
  }

  setAuthentication(user:User){
      this.User.set(user);
      this.isLoggedIn.set(true)
  }

  deleteUserData() {
    this.User.set(undefined);
    this.isLoggedIn.set(false);
  }

  CurrentUser(): Observable<User> {
    return this.Http.get<User>(`${this.apiUrl}/auth/me`);
  }

  Logout() {
    return this.Http.post(`${this.apiUrl}/auth/logout`, {});
  }
}
