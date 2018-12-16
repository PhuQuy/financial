import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AdminNavComponent } from './admin-nav/admin-nav.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NgbModule.forRoot()
  ],
  declarations: [
    FooterComponent,
    SidebarComponent,
    AdminNavComponent
  ],
  exports: [
    FooterComponent,
    SidebarComponent,
    AdminNavComponent
  ]
})
export class ComponentsModule { }
