import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFirestore } from 'angularfire2/firestore';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class BaseService {
    protected basePath = '';
    constructor(protected angularFireDatabase: AngularFireDatabase, protected angularFirestore: AngularFirestore, path: string) {
        this.basePath = path;
        angularFirestore.firestore.settings({ timestampsInSnapshots: true });
    }

    public getAlls(): Observable<any> {
        let alls = this.angularFirestore.collection<any>(this.basePath).snapshotChanges().pipe(
            map(actions => actions.map(a => {
                const data = a.payload.doc.data();
                const id = a.payload.doc.id;
                return { id, ...data };
            }))
        );

        if (alls) {
            return alls;
        } else {
            return Observable.create();
        }
    }

    public updateWithId(data, id) {
        if (id == null) {
            return null;
        }
        this.checkLog(this.basePath, 'update');

        const timestamp = this.timestamp;
        return this.angularFirestore.collection(this.basePath).doc(id).set({
            ...data, createdAt: timestamp
        });
    }

    public update(data) {
        this.checkLog(this.basePath, 'update');

        this.angularFirestore.collection(this.basePath).doc(data.id)
            .update(data);
    }


    public getById(id) {
        let itemPath = `${this.basePath}/${id}`;
        return this.angularFirestore.doc<any>(itemPath).valueChanges();
    }

    public deleteById(id) {
        let itemPath = `${this.basePath}/${id}`;
        this.checkLog(this.basePath, 'delete');
        return this.angularFirestore.doc<any>(itemPath).delete();
    }

    public create(data: any): any {
        const timestamp = this.timestamp;
        this.checkLog(this.basePath, 'create');
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
            this.checkLog(this.basePath, 'create');
            return this.angularFirestore.collection(this.basePath).add({
                ...data, createdAt: timestamp
            });
        }
        this.checkLog(this.basePath, 'update');

        return this.angularFirestore.collection(this.basePath).doc(data.id).set({
            ...data, createdAt: timestamp
        });
    }

    public updateElement(id, value) {
        if (id == null) {
            return null;
        }
        this.checkLog(this.basePath, 'update');
        return this.angularFirestore.collection(this.basePath).doc(id).update(value);
    }

    checkLog(path, type) {
        const timestamp = this.timestamp;
        this.angularFirestore.collection('system').add({
            collection: path, type: type, createdAt: timestamp
        });
    }
}
