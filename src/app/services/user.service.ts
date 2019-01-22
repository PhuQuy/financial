import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFirestore } from 'angularfire2/firestore';
import { BaseService } from './base.service';
import * as JsEncryptModule from 'jsencrypt';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class UserService extends BaseService {
    encrypt;
    constructor(protected angularFireDatabase: AngularFireDatabase, protected angularFirestore: AngularFirestore) {
        super(angularFireDatabase, angularFirestore, 'user');

        this.encrypt = new JsEncryptModule.JSEncrypt();
        this.encrypt.setPublicKey(environment.publishSSHRASKey);
    }

    public createUser(data: any): any {
        const timestamp = this.timestamp;
        let encrypted = this.encrypt.encrypt(data.phone + '');
        data.phone = encrypted;
        return this.angularFirestore.collection(this.basePath).add({
            ...data, createdAt: timestamp
        });
    }

    public updateUser(id, value) {
        if (id == null) {
            return null;
        }
        this.checkLog(this.basePath, 'update');
        let encrypted = this.encrypt.encrypt(value.phone + '');
        value.phone = encrypted;
        return this.angularFirestore.collection(this.basePath).doc(id).update(value);
    }


    public getAllByMonth(start, end): Observable<any> {
        console.log('quan que');
        
        return this.angularFirestore.collection<any>(this.basePath, ref => ref.where('createdAt', '>', start)
            .where('createdAt', '<', end).orderBy('createdAt', 'desc')).snapshotChanges().pipe(
                map(actions => actions.map(a => {
                    const data = a.payload.doc.data();
                    const id = a.payload.doc.id;
                    return { id, ...data };
                }))
            );
    }
}
