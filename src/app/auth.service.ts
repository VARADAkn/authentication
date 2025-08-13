import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private API_URL = 'http://localhost:3000/api/auth';

  constructor(private http: HttpClient) {}

  signup(username: string, email: string, password: string, role: string = 'user') {
  return this.http.post(`${this.API_URL}/signup`, {
    username,
    email,
    password,
    role
  });
}

  login(email: string, password: string) {
    return this.http.post(`${this.API_URL}/login`, {
      email,
      password
    });
  }
}
