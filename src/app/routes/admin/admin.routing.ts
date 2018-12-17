import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListingComponent } from './user/user-listing/user-listing.component';
import { UserDetailComponent } from './user/user-detail/user-detail.component';

const routes: Routes = [
    {
        path: 'users',
        component: UserListingComponent
    },
    {
        path: 'users/:id',
        component: UserDetailComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ]
})
export class AdminRoutingModule { }
