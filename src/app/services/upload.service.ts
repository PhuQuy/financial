import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Observable } from "rxjs/Observable";
import { Observer } from "rxjs/Observer";

@Injectable()
export class UploadService {

    private basePath = 'uploads';

    ahiuhi() {

    }

    pushUpload(file) {

        return Observable.create((obs: Observer<string>) => {
            const storageRef = firebase.storage().ref();
            const uploadTask = storageRef.child(`${this.basePath}/${file.name}`).put(file);
            const sub = uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
                (snapshot) => {
                    // upload in progress
                    const snap = snapshot as firebase.storage.UploadTaskSnapshot;
                    // upload.progress = (snap.bytesTransferred / snap.totalBytes) * 100;
                },
                (error) => {
                    // upload failed
                    console.log(error)
                },
                () => {
                    uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                        obs.next(downloadURL);
                        obs.complete();
                      });
                }
            );

        });

    }

}
