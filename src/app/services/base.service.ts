import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFirestore } from 'angularfire2/firestore';
import { map } from 'rxjs/operators';

@Injectable()
export class BaseService {
    protected basePath = '';
    constructor(protected angularFireDatabase: AngularFireDatabase, protected angularFirestore: AngularFirestore, path: string) {
        this.basePath = path;
        angularFirestore.firestore.settings({ timestampsInSnapshots: true });
    }

    public getAlls() {
        return this.angularFirestore.collection<any>(this.basePath).snapshotChanges().pipe(
            map(actions => actions.map(a => {
                const data = a.payload.doc.data();
                const id = a.payload.doc.id;
                return { id, ...data };
            }))
        );
    }

    public updateWithId(data, id) {
        if (id == null) {
            return null;
        }
        const timestamp = this.timestamp;
        return this.angularFirestore.collection(this.basePath).doc(id).set({
            ...data, createdAt: timestamp
        });
    }

    public update(data) {
        this.angularFireDatabase.object(this.basePath)
            .update(data);
    }


    public getById(id) {
        let itemPath = `${this.basePath}/${id}`;
        return this.angularFirestore.doc<any>(itemPath).valueChanges();
    }

    public deleteById(id) {
        let itemPath = `${this.basePath}/${id}`;
        return this.angularFirestore.doc<any>(itemPath).delete();
    }

    public create(data: any): any {
        const timestamp = this.timestamp;
        return this.angularFirestore.collection(this.basePath).add({
            ...data, createdAt: timestamp
        });
    }

    get timestamp() {
        return firebase.firestore.FieldValue.serverTimestamp();
    }

    public updateOrCreate(data: any): any {
        const timestamp = this.timestamp;
        if (data.id == null) {
            return this.angularFirestore.collection(this.basePath).add({
                ...data, createdAt: timestamp
            });
        }
        return this.angularFirestore.collection(this.basePath).doc(data.id).set({
            ...data, createdAt: timestamp
        });
    }

    public updateElement(id, value) {
        if (id == null) {
            return null;
        }
        const timestamp = this.timestamp;
        return this.angularFirestore.collection(this.basePath).doc(id).update(value);
    }

}
