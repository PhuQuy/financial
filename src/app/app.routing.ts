import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/auth.guard';

const routes: Routes = [
    {
        path: 'login',
        loadChildren: './routes/log-in/log-in.module#LoginModule'
    },
    {
        path: '',
        loadChildren: './layouts/client/client.module#ClientModule'
    },
    {
        path: 'admin',
        canActivate: [AuthGuard],
        loadChildren: './layouts/admin/admin.module#AdminModule'
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ],
})

export class AppRoutingModule { }
