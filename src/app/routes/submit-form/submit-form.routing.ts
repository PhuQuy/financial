import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SubmitFormComponent } from './submit-form.component';

const routes: Routes = [
    {
        path: '',
        component: SubmitFormComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class SubmitFormRoutingModule { }
