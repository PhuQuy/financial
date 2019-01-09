import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { environment } from '@env/environment';
import { NgtUniversalModule } from '@ng-toolkit/universal';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { AuthGuard } from './core/auth.guard';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedService } from './services/shared.service';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        CommonModule,
        BrowserAnimationsModule,
        NgtUniversalModule,
        AppRoutingModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFirestoreModule
    ],
    providers: [AngularFireDatabase, AngularFireAuth, AuthGuard,SharedService]
})
export class AppModule { }
