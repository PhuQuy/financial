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
import { GetUser, GETUSER, Login, LOGIN, LogInFailure, LogInSuccess } from '../actions/auth.action';
import { Action } from '../reducers/auth.reducer';

@Injectable()
export class AuthEffects {
    constructor(
        private actions: Actions,
        private authService: AuthService,
        private router: Router,
        private managerService: ManagerService
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
            if(user[0]) {
                return new LogInSuccess({ ...user[0] })
            } else {
                return new LogInFailure({error: 'User not found'})
            }
        })
        .catch(err => of(new LogInFailure({ error: err.message })));


    // @Effect()
    // GetUser: Observable<any> = this.actions.ofType(GETUSER).pipe(
    //     map((action: GETUSER) => action.payload),
    //     switchMap(payload => {
    //         console.log(payload)
    //         return this.managerService.getByUid(payload['user'].uid);
    //     }),
    //     mergeMap(actions => actions),
    //     map(action => {
    //         return {
    //             type: `[Pizza] ${action.type}`,
    //             payload: { id: action.payload.doc.id, ...action.payload.doc.data() }
    //         };
    //     })
    // )
}
