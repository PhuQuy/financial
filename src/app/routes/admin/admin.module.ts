import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DecryptPhone } from '@app/core/decryptphone';
import { ModalsModule } from '@app/modals/modals.module';
import { MessagingService } from '@app/services/messaging.service';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { AdminRoutingModule } from './admin.routing';
import { BlogDetailComponent } from './blog/blog-detail/blog-detail.component';
import { BlogListComponent } from './blog/blog-list/blog-list.component';
import { ChatManageComponent } from './chat-manage/chat-manage.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserDetailComponent } from './user/user-detail/user-detail.component';
import { UserListingComponent } from './user/user-listing/user-listing.component';
@NgModule({
    imports: [
        CommonModule,
        AdminRoutingModule,
        ModalsModule,
        NgbModalModule,
        FormsModule,
        FroalaEditorModule.forRoot(), FroalaViewModule.forRoot()
    ],
    declarations: [
        UserListingComponent,
        UserDetailComponent,
        DecryptPhone,
        BlogDetailComponent,
        BlogListComponent,
        DashboardComponent,
        ChatManageComponent
    ],
    providers: [MessagingService]
})
export class AdminModule { }
