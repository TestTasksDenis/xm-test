import { Component } from '@angular/core';
import { AuthService } from '../../../../../services/auth/auth.service';

@Component({
  selector: 'xm-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(
    private readonly authService: AuthService,
  ) {}

  signOut(): void {
    this.authService.signOut();
  }
}
