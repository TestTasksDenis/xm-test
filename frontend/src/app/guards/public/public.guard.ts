import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class PublicGuard implements CanActivate, CanLoad {
  currentUser = this.authService.getCurrentUser();

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    if (this.isUserLoggedIn()) {
      this.router.navigate(['/dashboard']);

      return false;
    }

    return true;
  }

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> | boolean {
    if (this.isUserLoggedIn()) {
      this.router.navigate(['/dashboard']);

      return false;
    }

    return true;
  }

  private isUserLoggedIn(): boolean {
    return !!this.authService.getCurrentUser()?.user;
  }
}
