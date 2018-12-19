import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubmitFormComponent } from './submit-form.component';
import { SubmitFormRoutingModule } from './submit-form.routing';
import { FormsModule } from '@angular/forms';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    imports: [
        CommonModule,
        SubmitFormRoutingModule,
        FormsModule,
        NgbModule.forRoot()
    ],
    declarations: [SubmitFormComponent]
})
export class SubmitFormModule { }
