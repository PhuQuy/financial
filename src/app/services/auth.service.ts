import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { User } from '../components/redux/models/user.model';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private currentUser: firebase.User = null;
    private BASE_URL = 'http://localhost:4200';
    constructor(private http: HttpClient, private afAuth: AngularFireAuth) { }


    logIn(email: string, password: string) {
        return this.afAuth.auth.signInWithEmailAndPassword(email, password);
    }

    signUp(email: string, password: string): Observable<User> {
        const url = `${this.BASE_URL}/register`;
        return this.http.post<User>(url, { email, password });
    }

    // public getByUid(id) {
    //     let itemsCollection = this.angularFirestore.collection('manager', ref => ref.where('uid', '==', id));
    //     return itemsCollection.snapshotChanges().map(changes => {
    //         return changes.map(a => {
    //             const data = a.payload.doc.data();
    //             const id = a.payload.doc.id;
    //             return { id, ...data };
    //         });
    //     });
    // }

    logout() {
        this.afAuth.auth.signOut();
    }

}
