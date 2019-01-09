import { Injectable, Output, EventEmitter } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class SharedService {

    @Output() title: EventEmitter<any[]> = new EventEmitter();
    changeTitle(title) {
        this.title.emit(title);
    }

    constructor() { }
}
