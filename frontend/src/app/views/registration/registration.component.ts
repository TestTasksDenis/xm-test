import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { takeUntil } from 'rxjs';

import { RegisterService } from './services/register/register.service';
import { WithDestroy } from '../../mixins/with-destroy.mixin';
import { RegistrationField } from './types/field-registration.interface';
import { Dictionary } from '../../types/dictionary.interface';
import { FieldValidation } from './types/field-validation.interface';
import { MaxLength, MinLength, validate } from 'class-validator';
import { RegistrationRequest } from './types/registration-request.interface';
import { Token } from '../../types/token.interface';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'xm-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent extends WithDestroy() implements OnInit {
  form: FormGroup | null = null;
  formFields: RegistrationField[] = [];
  testUser: RegistrationRequest | null = null;
  sendingData = false;

  constructor(
    public readonly registerService: RegisterService,
    private readonly formBuilder: FormBuilder,
    private readonly authService: AuthService,
    private readonly router: Router,
  ) {
    super();
  }

  ngOnInit(): void {
    this.registerService.getRegistrationFields()
      .pipe(takeUntil(this.destroy$))
      .subscribe((registrationFields: RegistrationField[]) => {
        this.initForm(registrationFields);
      });
  }

  onSubmit(): void {
    this.form?.markAllAsTouched();

    if (this.form?.valid) {
      this.registerService.registerUser(this.form?.value)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (data: {user: RegistrationRequest, token: Token}) => {
            this.testUser = data.user;
            this.authService.saveJwtToken(data.token);
          },
          error: (error: HttpErrorResponse) => console.error(error),
          complete: () => {
            this.router.navigate(['/dashboard']);
          },
        });
    }
  }

  private initForm(registrationFields: RegistrationField[]): void {
    this.formFields = registrationFields;

    const dynamicFields: Dictionary = {};

    registrationFields.forEach((item: RegistrationField) => {
      dynamicFields[item.name] = [null, this.setValidators(item.required, item.validations)];
    });

    this.form = this.formBuilder.group(dynamicFields);
  }

  private setValidators(isRequired: boolean, validators?: FieldValidation[]): Validators[] {
    const validatorsList: Validators[] = [];

    if (isRequired) {
      validatorsList.push(Validators.required);
    }

    if (validators) {
      validators.forEach(item => {
        switch (item.name) {
          case 'pattern': {
            validatorsList.push(Validators.pattern(item.value));
            break;
          }
          case 'minlength': {
            validatorsList.push(Validators.minLength(+item.value));
            break;
          }
          case 'maxlength': {
            validatorsList.push(Validators.maxLength(+item.value));
            break;
          }
        }
      });
    }

    return validatorsList;
  }
}
