import { Component, OnInit } from '@angular/core';
import { ContactService } from '@app/services/contact.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmComponent } from '@app/modals/confirm/confirm.component';

@Component({
    selector: 'app-contact',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.scss'],
    providers: [ContactService]
})
export class ContactComponent implements OnInit {
    contacts = [];
    constructor(protected contactService: ContactService, private modalService: NgbModal) {
        contactService.getAlls().subscribe(contacts => {
            this.contacts = contacts;
        })
    }

    ngOnInit() {
    }

    delete(id) {
        const modalRef = this.modalService.open(ConfirmComponent, { centered: true });
        modalRef.componentInstance.title = 'Xác nhận xóa';
        modalRef.componentInstance.id = id;
        modalRef.componentInstance.question = 'Bạn có chắc chắn xóa không?';
        modalRef.componentInstance.confirmText = 'Xóa';

        modalRef.result.then((id) => {
            this.contactService.deleteById(id);

        }, () => { })
    }

}
