import { Injectable } from '@angular/core';
// import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import 'rxjs/add/operator/take';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';

@Injectable()
export class MessagingService {
    messaging = firebase.messaging();
    currentMessage = new BehaviorSubject(null);
    constructor(private angularFirestore: AngularFirestore, private afAuth: AngularFireAuth) {
    }
    updateToken(token) {
        let user = this.afAuth.authState.take(1);
        if (user) {
            user.subscribe(user => {
                if (!user) return;
                // const data = { [user.uid]: token }
                console.log(user);

                const data = { userID: user.uid, token: token }
                var tokens = this.angularFirestore.doc('fcmTokens/' + user.uid).set(data);
            })
        }
    }
    getPermission() {
        this.messaging.requestPermission()
            .then(() => {
                console.log('Notification permission granted.');
                return this.messaging.getToken();
            })
            .then(token => {
                console.log(token)
                this.updateToken(token)
            })
            .catch((err) => {
                console.log('Unable to get permission to notify.', err);
            });
    }
    receiveMessage() {
        this.messaging.onMessage((payload) => {
            console.log("Message received. ", payload);
            this.currentMessage.next(payload)
        });
    }
}
