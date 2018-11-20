import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { environment } from '@env/environment';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgtUniversalModule } from '@ng-toolkit/universal';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { CustomerFeedbackComponent } from './components/customer-feedback/customer-feedback.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NewsItemModule } from './components/news-item/news-item.module';
import { HomeComponent } from './routes/home/home.component';
import { LogInComponent } from './routes/log-in/log-in.component';
import { SignUpComponent } from './routes/sign-up/sign-up.component';
import { ContactUsComponent } from './routes/contact-us/contact-us.component';

@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        HomeComponent,
        FooterComponent,
        SignUpComponent,
        LogInComponent,
        CustomerFeedbackComponent,
        ContactUsComponent
    ],
    imports: [
        CommonModule,
        NgtUniversalModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        NgbModule.forRoot(),
        AppRoutingModule,
        NewsItemModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFirestoreModule.enablePersistence()
    ],
    providers: [AngularFireDatabase]
})
export class AppModule { }
