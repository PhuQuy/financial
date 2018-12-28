import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmComponent } from './confirm/confirm.component';
import { ConfirmNotSubmitComponent } from './confirm/confirm-not-submit/confirm-not-submit.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ConfirmComponent, ConfirmNotSubmitComponent],
  exports: [ConfirmComponent, ConfirmNotSubmitComponent],
  entryComponents: [ConfirmComponent, ConfirmNotSubmitComponent]
})
export class ModalsModule { }
