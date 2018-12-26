import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubmitFormComponent } from './submit-form.component';
import { SubmitFormRoutingModule } from './submit-form.routing';
import { FormsModule } from '@angular/forms';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HinhThucVayTienComponent } from './hinh-thuc-vay-tien/hinh-thuc-vay-tien.component';
import { LaiSuatComponent } from './lai-suat/lai-suat.component';

@NgModule({
    imports: [
        CommonModule,
        SubmitFormRoutingModule,
        FormsModule,
        NgbModule.forRoot()
    ],
    declarations: [SubmitFormComponent, HinhThucVayTienComponent, LaiSuatComponent]
})
export class SubmitFormModule { }
