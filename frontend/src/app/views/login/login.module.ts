import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { FormElementsModule } from '../../modules/form-elements/form-elements.module';
import { ButtonModule } from '../../modules/button/button.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    LoginComponent,
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    FormElementsModule,
    ButtonModule,
    ReactiveFormsModule,
  ],
})
export class LoginModule { }
