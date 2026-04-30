import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  username = '';
  password = '';
  errorMsg = '';
  private platformId = inject(PLATFORM_ID);

  constructor(private http: HttpClient, private router: Router) {}

  login() {
    const body = { username: this.username, password: this.password };

    this.http.post<any>('http://localhost:8080/api/auth/login', body)
      .subscribe({
        next: (res) => {
          if (isPlatformBrowser(this.platformId)) {
            localStorage.setItem('token', res.token);
          }
          this.router.navigate(['/dashboard']);
        },
        error: () => {
          this.errorMsg = 'Usuario o contraseña incorrectos';
        }
      });
  }
}