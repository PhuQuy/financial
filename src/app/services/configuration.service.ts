import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFirestore } from 'angularfire2/firestore';
import { BaseService } from './base.service';

@Injectable()
export class ConfigurationService extends BaseService {
    constructor(protected angularFireDatabase: AngularFireDatabase, protected angularFirestore: AngularFirestore) {
        super(angularFireDatabase, angularFirestore, 'configuration');
    }

    public getAllConfiguration() {
        return this.angularFirestore.collection('configuration').snapshotChanges();
    }
}
