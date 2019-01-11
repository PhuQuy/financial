import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs';
// import { NotifyService } from './notify.service';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import { map, take, tap } from 'rxjs/operators';

@Injectable()
export class AdminGuard implements CanActivate {
    constructor(private router: Router, private afAuth: AngularFireAuth) { }


    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | boolean {
        // return this.afAuth.authState
        //     .take(1)
        //     .map(user => user &&  user['roles'] && user['roles'].admin ? true : false)
        //     tap(isAdmin => {
        //       if (!isAdmin) {
        //         console.error('Access denied - Admins only')
        //       }
        //     })

        return this.afAuth.authState.pipe(
            take(1),
            map(user => user && user['roles'] && user['roles'].admin ? true : false),
            tap(isAdmin => {
              if (!isAdmin) {
                console.error('Access denied - Admins only')
                this.router.navigate(['/admin/users']);

              }
            })
          );
    }
}