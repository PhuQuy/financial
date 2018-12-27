import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactUsComponent } from '@routes/contact-us/contact-us.component';
import { ClientComponent } from './client.component';

const routes: Routes = [
    {
        path: '',
        component: ClientComponent,
        children: [
            { path: '', loadChildren: './../../routes/home/home.module#HomeModule' },
            { path: 'contact-us', component: ContactUsComponent },
            { path: 'news', loadChildren: './../../routes/news/news.module#NewsModule' },
            {
                path: 'form',
                loadChildren: './../../routes/submit-form/submit-form.module#SubmitFormModule'
            },
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ],
})

export class ClientRoutingModule { }
