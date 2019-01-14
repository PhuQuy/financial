import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-confirm',
    templateUrl: './confirm.component.html',
    styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent implements OnInit {
    title;
    question;
    confirmText;
    id;
    constructor(public activeModal: NgbActiveModal) { }

    ngOnInit() {
    }

    confirm(value) {
        this.activeModal.close(value);
    }

}
