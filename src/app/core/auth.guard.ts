import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
// import { NotifyService } from './notify.service';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private router: Router, private afAuth: AngularFireAuth) { }


    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | boolean {
        return this.afAuth.authState
            .take(1)
            .map(user => {
                console.log(user);
                return !!user;
            })
            .do(loggedIn => {
                if (!loggedIn) {
                    console.log('access denied')
                    this.router.navigate(['/login']);
                }
            })
    }
}