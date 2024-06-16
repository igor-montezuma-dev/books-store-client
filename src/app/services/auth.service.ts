import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export default class AuthService {

  http = inject(HttpClient);

  baseUrl = 'http://localhost:3000/api/auth/';

  registerService(registerObj: any){
    return this.http.post<any>(`${this.baseUrl}user-register`, registerObj);
  }

  loginService(loginObj: any){
    return this.http.post<any>(`${this.baseUrl}login`, loginObj);
  }
}
