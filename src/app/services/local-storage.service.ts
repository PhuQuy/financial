import { LOCAL_STORAGE } from '@ng-toolkit/universal';
import { Injectable, Inject } from '@angular/core';

const APP_PREFIX = 'HOST-';

@Injectable({
    providedIn: 'root'
})
export class LocalStorageService {
    constructor(@Inject(LOCAL_STORAGE) private localStorage: any, ) { }

    setItem(key: string, value: any) {
        this.localStorage.setItem(`${APP_PREFIX}${key}`, JSON.stringify(value));
    }

    getItem(key: string) {
        let value = this.localStorage.getItem(`${APP_PREFIX}${key}`);
        if(value && value != 'undefined') {
            return JSON.parse(value);
        } else {
            return null;
        }
    }

    remove(key: string) {
        this.localStorage.removeItem(`${APP_PREFIX}${key}`);
    }
}
