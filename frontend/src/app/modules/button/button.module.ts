import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BtnPrimaryComponent } from './components/btn-primary/btn-primary.component';

@NgModule({
  declarations: [
    BtnPrimaryComponent,
  ],
  exports: [
    BtnPrimaryComponent,
  ],
  imports: [
    CommonModule,
  ],
})
export class ButtonModule { }
