import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogInComponent } from './log-in.component';
import { LoginRoutingModule } from './log-in.routing';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { authReducer } from '@app/components/redux/reducers/auth.reducer';

@NgModule({
  imports: [
    CommonModule,
    LoginRoutingModule,
    FormsModule,
    StoreModule.forRoot({
      authState: authReducer
  })
  ],
  declarations: [LogInComponent]
})
export class LoginModule { }
