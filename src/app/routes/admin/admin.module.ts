import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin.routing';
import { MessagingService } from '@app/services/messaging.service';
import { UserListingComponent } from './user/user-listing/user-listing.component';
import { UserDetailComponent } from './user/user-detail/user-detail.component';
import { ModalsModule } from '@app/modals/modals.module';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { DecryptPhone } from '@app/core/decryptphone';
import { BlogDetailComponent } from './blog/blog-detail/blog-detail.component';
import { BlogListComponent } from './blog/blog-list/blog-list.component';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
    imports: [
        CommonModule,
        AdminRoutingModule,
        ModalsModule,
        NgbModalModule
    ],
    declarations: [
        UserListingComponent,
        UserDetailComponent,
        DecryptPhone,
        BlogDetailComponent,
        BlogListComponent,
        DashboardComponent,
        DashboardComponent
    ],
    providers: [MessagingService]
})
export class AdminModule { }
