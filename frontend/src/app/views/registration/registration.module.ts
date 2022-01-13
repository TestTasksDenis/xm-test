import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegistrationRoutingModule } from './registration-routing.module';
import { RegistrationComponent } from './registration.component';
import { FormElementsModule } from '../../modules/form-elements/form-elements.module';
import { ButtonModule } from '../../modules/button/button.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ErrorMessagePipe } from './pipes/error-message/error-message.pipe';
import { RegisterService } from './services/register/register.service';

@NgModule({
  declarations: [
    RegistrationComponent,
    ErrorMessagePipe,
  ],
  imports: [
    CommonModule,
    RegistrationRoutingModule,
    FormElementsModule,
    ButtonModule,
    ReactiveFormsModule,
  ],
  providers: [RegisterService],
})
export class RegistrationModule { }
