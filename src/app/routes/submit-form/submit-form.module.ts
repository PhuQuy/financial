import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubmitFormComponent } from './submit-form.component';
import { SubmitFormRoutingModule } from './submit-form.routing';

@NgModule({
    imports: [
        CommonModule,
        SubmitFormRoutingModule
    ],
    declarations: [SubmitFormComponent]
})
export class SubmitFormModule { }
