import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(
    private readonly authService: AuthService,
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const currentUser = this.authService.getCurrentUser();

    if (currentUser && this.authService.getJwtToken()?.accessToken) {
      const clonedRequest = request.clone({
        setHeaders: {
          Authorization: `${this.authService.getJwtToken()?.type} ${this.authService.getJwtToken()?.accessToken}`,
        },
      });

      return next.handle(clonedRequest);
    }

    return next.handle(request);
  }
}
