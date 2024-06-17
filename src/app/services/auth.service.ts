import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root',
})
export default class AuthService {

  http = inject(HttpClient);
  isLoggedIn$ = new BehaviorSubject<boolean>(false);
  private userSubject = new BehaviorSubject<any>(null);

  development = 'http://localhost:3000/api/auth/';
  production = 'https://book-store-api-zpwr.onrender.com/api/auth/'

  baseUrl = this.production;

  registerService(registerObj: any) {
    return this.http.post<any>(`${this.baseUrl}user-register`, registerObj);
  }

  loginService(loginObj: any) {
    return this.http.post<any>(`${this.baseUrl}login`, loginObj);
  }

  sendEmailService(email: string) {
    return this.http.post<any>(`${this.baseUrl}send-email`, { email: email });
  }

  resetPasswordService(resetObj: any) {
    return this.http.post<any>(`${this.baseUrl}reset-password`, resetObj);
  }

  setUser(user: any) {
    this.userSubject.next(user);
  }

  getUser() {
    return this.userSubject.asObservable();
  }

  isLoggedIn(){
    return !!localStorage.getItem('user_id');
  }
}
