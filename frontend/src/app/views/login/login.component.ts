import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

import { takeUntil } from 'rxjs';

import { AuthService } from '../../services/auth/auth.service';
import { WithDestroy } from '../../mixins/with-destroy.mixin';
import { Token } from '../../types/token.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'xm-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent extends WithDestroy() {
  form: FormGroup = this.formBuilder.group({
    email: ['guest@gmail.com', [Validators.required, Validators.email]],
    password: ['guest', [Validators.required]],
  });
  showUnauthorizedMessage = false;
  sendingData = false;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly authService: AuthService,
    private readonly router: Router,
  ) {
    super();
  }

  onSubmit(): void {
    this.form.markAllAsTouched();

    if (this.form.valid) {
      this.authService.signIn(this.form.value)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (data: Token | null) => {
            if (data) {
              this.authService.saveJwtToken(data);
              this.router.navigate(['/dashboard']);
            } else {
              this.showUnauthorizedMessage = true;
            }
          },
          error: (error: HttpErrorResponse) => console.error(error),
        });
    }
  }
}
