import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrivateRoutingModule } from './private-routing.module';
import { PrivateComponent } from './private.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [
    PrivateComponent,
    HeaderComponent,
    FooterComponent,
  ],
  imports: [
    CommonModule,
    PrivateRoutingModule,
  ],
})
export class PrivateModule { }
