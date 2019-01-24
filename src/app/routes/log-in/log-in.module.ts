import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LogInComponent } from './log-in.component';
import { LoginRoutingModule } from './log-in.routing';

@NgModule({
  imports: [
    CommonModule,
    LoginRoutingModule,
    FormsModule
  ],
  declarations: [LogInComponent]
})
export class LoginModule { }
