import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoadingModule } from '@app/components/loading/loading.module';
import { PaginationModule } from '@app/components/pagination/pagination.module';
import { AdminGuard } from '@app/core/admin.guard';
import { DecryptPhone } from '@app/core/decryptphone';
import { ModalsModule } from '@app/modals/modals.module';
import { MessagingService } from '@app/services/messaging.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { TagInputModule } from 'ngx-chips';
import { AdminRoutingModule } from './admin.routing';
import { BlogDetailComponent } from './blog/blog-detail/blog-detail.component';
import { BlogListComponent } from './blog/blog-list/blog-list.component';
import { ChatManageComponent } from './chat-manage/chat-manage.component';
import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';
import { ContactComponent } from './contact/contact.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserManagementDetailComponent } from './user-management/user-management-detail/user-management-detail.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { UserDetailComponent } from './user/user-detail/user-detail.component';
import { UserListingComponent } from './user/user-listing/user-listing.component';

@NgModule({
    imports: [
        CommonModule,
        AdminRoutingModule,
        ModalsModule,
        NgbModule,
        FormsModule,
        ReactiveFormsModule,
        FroalaEditorModule.forRoot(), 
        FroalaViewModule.forRoot(),
        Ng2SearchPipeModule,
        TagInputModule,
        HttpClientModule,
        LoadingModule,
        PaginationModule
    ],
    declarations: [
        UserListingComponent,
        UserDetailComponent,
        DecryptPhone,
        BlogDetailComponent,
        BlogListComponent,
        DashboardComponent,
        ChatManageComponent,
        ContactComponent,
        UserManagementComponent,
        UserManagementDetailComponent,
        BreadcrumbsComponent
    ],
    providers: [MessagingService, AdminGuard]
})
export class AdminModule { }
