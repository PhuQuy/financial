import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { SeoService } from '@app/services/seo.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from "@angular/router";
import { AngularFirestore } from 'angularfire2/firestore';
import { LocalStorageService } from '@app/services/local-storage.service';
import { AuthService } from '@app/services/auth.service';

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

    ngOnInit() {
        setTimeout(() => {
            this.seoService.generateTags({
                title: 'Quản trị admin',
                description: 'Dang nhap de quan tri',
                slug: 'login',
                keywords: 'admin page'
            });
        }, 2000);
    }

    isEmailValidated: boolean = false;
    email = '';
    password = '';
    error;
    loading;
    constructor(
        private afAuth: AngularFireAuth,
        public router: Router,
        private authService: AuthService,
        private localStored: LocalStorageService,
        private seoService: SeoService,
        private store: Store<User>
    ) { }

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
        return this.authService.logIn(this.email, this.password)
            .then((user) => {
                this.loading = false;
                console.log(user);

                // this.localStored.setItem('user', user);
                this.router.navigate(['/admin']);

            })
            .catch(error => {
                this.loading = false;
                console.log(error);
                this.error = error.message;
            });
    }
}
