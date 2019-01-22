import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from '@env/environment';
import { NgtUniversalModule } from '@ng-toolkit/universal';
import { EffectsModule } from '@ngrx/effects';
import { ActionReducer, MetaReducer, StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { localStorageSync } from 'ngrx-store-localstorage';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { reducers } from './components/redux/app.states';
import { AuthEffects } from './components/redux/effects/auth.effect';
import { AuthGuard } from './core/auth.guard';
import { AuthService } from './services/auth.service';
import { SharedService } from './services/shared.service';
import { ManagerService } from './services/manager.service';
import { ConfigurationService } from './services/configuration.service';

export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
    return localStorageSync(
      {
        keys: ['auth'],
        rehydrate: true
      })(reducer);
  }
  const metaReducers: Array<MetaReducer<any, any>> = [localStorageSyncReducer];
  
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
        AngularFirestoreModule,
        HttpClientModule,
        StoreModule.forRoot(reducers, { metaReducers }),
        !environment.production ? StoreDevtoolsModule.instrument() : [],
        EffectsModule.forRoot([AuthEffects])
    ],
    providers: [AngularFireDatabase, AngularFireAuth, AuthGuard,SharedService, AuthService,  ManagerService, ConfigurationService]
})
export class AppModule { }
