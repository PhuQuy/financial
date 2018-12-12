import { Component, OnInit } from '@angular/core';
import { SeoService } from '@app/services/seo.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from "@angular/router";
import { AngularFirestore } from 'angularfire2/firestore';
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
    constructor(private afAuth: AngularFireAuth, public router: Router, private afs: AngularFirestore, private seoService: SeoService) { }

    validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let result = re.test(String(email).toLowerCase());
        this.isEmailValidated = result;
        return result;
    }

    emailLogin() {
        this.loading = true;
        return this.afAuth.auth.signInWithEmailAndPassword(this.email, this.password)
            .then((user) => {
                this.loading = false;
                this.router.navigate(['/admin']);

            })
            .catch(error => {
                this.loading = false;
                console.log(error);
                this.error = error.message;
            });
    }
}
