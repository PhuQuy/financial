import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { AdminRoutingModule } from './admin.routing';
import { MessagingService } from '@app/services/messaging.service';
import { UserListingComponent } from './user/user-listing/user-listing.component';
import { UserDetailComponent } from './user/user-detail/user-detail.component';
import { ModalsModule } from '@app/modals/modals.module';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { DecryptPhone } from '@app/core/decryptphone';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    ModalsModule,
    NgbModalModule
    
  ],
  declarations: [AdminComponent, UserListingComponent, UserDetailComponent, DecryptPhone],
  providers: [MessagingService]
})
export class AdminModule { }
