import { Component, OnInit } from '@angular/core';
import { ContactService } from '@app/services/contact.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmComponent } from '@app/modals/confirm/confirm.component';
import { PaginationInstance } from 'ngx-pagination';

@Component({
    selector: 'app-contact',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.scss'],
    providers: [ContactService]
})
export class ContactComponent implements OnInit {
    contacts = [];
    breadcrumbs;
    term;

    config: PaginationInstance = {
        id: 'comment',
        itemsPerPage: 10,
        currentPage: 1
    };
    constructor(protected contactService: ContactService, private modalService: NgbModal) { }

    ngOnInit() {
        this.breadcrumbs = [
            {
                router: '/admin',
                title: 'Home'
            },
            {
                router: '/admin/contact',
                title: 'Contact Management'
            }
        ];
        this.loadContacts();
    }

    loadContacts() {
        this.contactService.getAlls().subscribe(contacts => {
            this.contacts = contacts;
        })
    }

    seen(contact) {
        contact.seen = true;
        this.contactService.update(contact);
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

    setItemPerpage(page) {
        this.config.itemsPerPage = page;
    }

}
