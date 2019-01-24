import { Injectable, Output, EventEmitter } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class SharedService {

    @Output() title: EventEmitter<any[]> = new EventEmitter();
    changeTitle(title) {
        this.title.emit(title);
    }

    @Output() user: EventEmitter<any[]> = new EventEmitter();
    newUser(user) {
        this.user.emit(user);
    }

    constructor() { }
}
