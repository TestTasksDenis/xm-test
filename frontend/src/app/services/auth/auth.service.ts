import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { Observable } from 'rxjs';

import { Environment } from '../../tokens/environment.token';
import { Login } from '../../views/login/types/login.interface';
import { Token } from '../../types/token.interface';
import { User } from '../../types/user.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly url = `${this.environment.backendUrl}/auth`;

  constructor(
    private readonly httpClient: HttpClient,
    private readonly environment: Environment,
    private readonly router: Router,
  ) { }

  signIn(body: Login): Observable<Token | null> {
    return this.httpClient.post<Token | null>(`${this.url}/login`, body);
  }

  signOut(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }

  saveJwtToken(data: Token | null): void {
    // to improve code we can add localStorage to Service or InjectionToken
    localStorage.setItem('token', JSON.stringify(data));
  }

  getCurrentUser(): { user: User, scopes: string[] } | null {
    let token: Token | null;

    try {
      token = JSON.parse(localStorage.getItem('token') ?? '');
    } catch {
      token = null;
    }

    return token ? jwtDecode(token?.accessToken) : null;
  }

  getJwtToken(): Token | null {
    let token: Token | null;

    try {
      token = JSON.parse(localStorage.getItem('token') ?? '');
    } catch {
      token = null;
    }

    return token;
  }
}
