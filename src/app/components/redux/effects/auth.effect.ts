import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@app/services/auth.service';
import { ManagerService } from '@app/services/manager.service';
import { Actions, Effect } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/switchMap';
import { GetUser, GETUSER, Login, LOGIN, LogInFailure, LogInSuccess, CONFIGURATION, Configuration, ConfigurationSuccess, ConfigurationFailed } from '../actions/auth.action';
import { Action } from '../reducers/auth.reducer';
import { ConfigurationService } from '@app/services/configuration.service';

@Injectable()
export class AuthEffects {
    constructor(
        private actions: Actions,
        private authService: AuthService,
        private router: Router,
        private managerService: ManagerService,
        private configurationService: ConfigurationService
    ) { }

    @Effect()
    Login: Observable<any> = this.actions
        .ofType(LOGIN)
        .map((action: Login) => action.payload)
        .switchMap(payload => {
            const email = payload.email;
            const password = payload.password;
            return this.authService.logIn(email, password)
                .then((res) => {
                    return new GetUser({ ...res });
                })
                .catch((error) => {
                    return Observable.create(new LogInFailure({ error: error }));
                });
        });


    @Effect()
    GetUser: Observable<Action> = this.actions.ofType(GETUSER)
        .map((action: GetUser) => action.payload)
        .switchMap(payload => {
            console.log(payload)
            return this.managerService.getUserByUID(payload['user'].uid);
        })
        .map((users) => {
            let user = [];
            users.map(a => {
                const data = a.payload.doc.data();
                const id = a.payload.doc.id;
                user.push({ id, ...data });
            });
            if (user[0]) {
                return new LogInSuccess({ ...user[0] })
            } else {
                return new LogInFailure({ error: 'User not found' })
            }
        })
        .catch(err => of(new LogInFailure({ error: err.message })));


    @Effect()
    Configuration = this.actions.ofType(CONFIGURATION)
        .map((action: Configuration) => action)
        .switchMap(() => {
            return this.configurationService.getAllConfiguration();
        })
        .map((configurations) => {
            let configuration = [];
            configurations.map(a => {
                const data = a.payload.doc.data();
                const id = a.payload.doc.id;
                configuration.push({ id, ...data });
            });
            if (configuration[0]) {
                console.log(configuration[0]);
                
                return new ConfigurationSuccess({ ...configuration[0] })
            } else {
                return new ConfigurationFailed({});
            }
        })
        .catch(err => of('Configuration Load Fail'));
}
