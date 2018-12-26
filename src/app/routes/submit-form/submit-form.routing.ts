import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SubmitFormComponent } from './submit-form.component';
import { HinhThucVayTienComponent } from './hinh-thuc-vay-tien/hinh-thuc-vay-tien.component';
import { LaiSuatComponent } from './lai-suat/lai-suat.component';

const routes: Routes = [
    {
        path: '',
        component: SubmitFormComponent
    },
    {
        path: 'hinh-thuc-vay',
        component: HinhThucVayTienComponent
    },
    {
        path: 'lai-suat',
        component: LaiSuatComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class SubmitFormRoutingModule { }
