import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from '../../services/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanLoad {
  currentUser = this.authService.getCurrentUser();

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    const hasRights = this.currentUser?.scopes.includes(route.data['scope']) ?? false;

    if (!hasRights) {
      this.router.navigate(['/']);

      return false;
    }

    return true;
  }

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> | boolean {
    const hasRights = this.currentUser?.scopes.includes(route.data ? route.data['scope'] : '') ?? false;

    if (!hasRights) {
      this.router.navigate(['/']);

      return false;
    }

    return true;
  }
}
