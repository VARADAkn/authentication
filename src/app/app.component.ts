import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title(title: any) {
    throw new Error('Method not implemented.');
  }
  constructor(private authService: AuthService) {}

  showLogin = true;

  loginData = {
    email: '',
    password: ''
  };

  signupData = {
  username: '',
  email: '',
  password: '',
  role: 'user' // default
};

  loginError = '';
  signupError = '';
  signupSuccess = '';

  toggleForm() {
    this.showLogin = !this.showLogin;

    this.loginError = '';
    this.signupError = '';
    this.signupSuccess = '';

    const loginFormEl = document.getElementById('loginForm');
    const signupFormEl = document.getElementById('signupForm');

    if (loginFormEl && signupFormEl) {
      loginFormEl.classList.toggle('hidden');
      signupFormEl.classList.toggle('hidden');
    }
  }

  onLoginSubmit(event: Event) {
    event.preventDefault();
    const { email, password } = this.loginData;

    if (!email || !password) {
      this.loginError = 'Please fill in all fields.';
      return;
    }

    this.authService.login(email, password).subscribe({
      next: (res: any) => {
        console.log('Login success:', res);
        alert(`Welcome ${res.user.username}`);
        this.loginError = '';
      },
      error: (err: HttpErrorResponse) => {
        console.error('Login error:', err);
        this.loginError = err.error?.message || 'Login failed';
      }
    });
  }

  onSignupSubmit(event: Event) {
    event.preventDefault();
    const { username, email, password,role } = this.signupData;

    if (!username || !email || !password) {
      this.signupError = 'All fields are required.';
      return;
    }

    this.authService.signup(username, email, password, role).subscribe({
      next: (res: any) => {
        console.log('Signup success:', res);
        this.signupSuccess = res.message || 'Signup successful';
        this.signupError = '';
        alert('Signup successful!');
      },
      error: (err: HttpErrorResponse) => {
        console.error('Signup error:', err);
        this.signupError = err.error?.message || 'Signup failed';
      }
    });
  }
  
}
