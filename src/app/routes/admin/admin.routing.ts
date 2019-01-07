import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListingComponent } from './user/user-listing/user-listing.component';
import { UserDetailComponent } from './user/user-detail/user-detail.component';
import { BlogListComponent } from './blog/blog-list/blog-list.component';
import { BlogDetailComponent } from './blog/blog-detail/blog-detail.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ChatManageComponent } from './chat-manage/chat-manage.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: '/admin/dashboard',
        pathMatch: 'full'
    },
    {
        path: 'dashboard',
        component: DashboardComponent
    },
    {
        path: 'users',
        component: UserListingComponent
    },
    {
        path: 'users/:id',
        component: UserDetailComponent
    },
    {
        path: 'blogs',
        component: BlogListComponent
    },
    {
        path: 'blogs/:id',
        component: BlogDetailComponent
    },
    {
        path: 'chat',
        component: ChatManageComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class AdminRoutingModule { }
