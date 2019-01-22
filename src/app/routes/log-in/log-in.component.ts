import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { Login } from '@app/components/redux/actions/auth.action';
import { selectAuthState } from '@app/components/redux/app.states';
import { SeoService } from '@app/services/seo.service';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';


interface User {
    uid: string;
    email: string;
    photoURL?: string;
    displayName?: string;
    favoriteColor?: string;
}

@Component({
    selector: 'app-log-in',
    templateUrl: './log-in.component.html',
    styleUrls: ['./log-in.component.scss'],
    providers: [SeoService]
})
export class LogInComponent implements OnInit {


    isEmailValidated: boolean = false;
    email = '';
    password = '';
    error;
    loading;
    getState: Observable<any>;

    constructor(
        public router: Router,
        private seoService: SeoService,
        private store: Store<User>
    ) {
        this.getState = this.store.select(selectAuthState);
    }

    ngOnInit() {
        setTimeout(() => {
            this.seoService.generateTags({
                title: 'Quản trị admin',
                description: 'Dang nhap de quan tri',
                slug: 'login',
                keywords: 'admin page'
            });
        }, 2000);

        this.getState.subscribe((state) => {
            this.loading = false;
            if (state && state.isAuthenticated) {
                this.router.navigate(['/admin']);
            } else {
                if (this.error == null) {
                    this.error = '';
                } else {
                    this.error = state.errorMessage;
                }
            }
        });
    }

    validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let result = re.test(String(email).toLowerCase());
        this.isEmailValidated = result;
        return result;
    }

    emailLogin() {
        const payload = {
            email: this.email,
            password: this.password
        };
        this.loading = true;
        this.store.dispatch(new Login(payload));
        // return this.authService.logIn(this.email, this.password)
        //     .then((user) => {
        //         this.loading = false;
        //         console.log(user);

        //         this.localStored.setItem('user', user);
        //         this.router.navigate(['/admin']);

        //     })
        //     .catch(error => {
        //         this.loading = false;
        //         console.log(error);
        //         this.error = error.message;
        //     });
    }
}
