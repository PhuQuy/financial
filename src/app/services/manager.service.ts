import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFirestore } from 'angularfire2/firestore';
import { BaseService } from './base.service';

@Injectable()
export class ManagerService extends BaseService {
    constructor(protected angularFireDatabase: AngularFireDatabase, protected angularFirestore: AngularFirestore) {
        super(angularFireDatabase, angularFirestore, 'manager');
    }

    updateBeforeDelete(id) {
        return this.angularFirestore.collection("manager").doc(id).update({
            "deleted": true
        });
    }

    public getByUid(id) {
        return this.angularFirestore.collection('manager', ref => ref.where('uid', '==', id)).stateChanges();
    }

    public getUserByUID(uid) {
        return this.angularFirestore.collection('manager', ref => ref.where('uid', '==', uid)).snapshotChanges();
    }

}
