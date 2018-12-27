import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContactUsComponent } from '@app/routes/contact-us/contact-us.component';
import { CustomerFeedbackComponent } from '@components/customer-feedback/customer-feedback.component';
import { FooterComponent } from '@components/footer/footer.component';
import { NavbarComponent } from '@components/navbar/navbar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ClientComponent } from './client.component';
import { ClientRoutingModule } from './client.routing';
import { AgmCoreModule } from '@agm/core';

@NgModule({
    imports: [
        CommonModule,
        ClientRoutingModule,
        NgbModule.forRoot(),
        FormsModule,
<<<<<<< HEAD
        ReactiveFormsModule,
        AgmCoreModule.forRoot({
          apiKey: 'AIzaSyDhMJyRMmSKUPnuWEUqmH87W531M1kdRK4'
        })
=======
        ReactiveFormsModule
>>>>>>> a13b6c235ac4d4b2725f7abaa9c9cee2daf192d1
    ],
    declarations: [
        ClientComponent,
        NavbarComponent,
        FooterComponent,
        CustomerFeedbackComponent,
        ContactUsComponent
    ]
})
export class ClientModule { }
