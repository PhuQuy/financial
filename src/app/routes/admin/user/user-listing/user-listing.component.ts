import { Component, OnInit } from '@angular/core';
import { MessagingService } from '@app/services/messaging.service';
import { UserService } from '@app/services/user.service';
import * as JsEncryptModule from 'jsencrypt';
import { environment } from '@env/environment';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmComponent } from '@app/modals/confirm/confirm.component';
import { Router } from '@angular/router';

@Component({
    selector: 'app-user-listing',
    templateUrl: './user-listing.component.html',
    styleUrls: ['./user-listing.component.scss'],
    providers: [UserService]
})
export class UserListingComponent implements OnInit {
    message;
    users = [];
    encrypt;
    alls: any;
    id_delete;
    constructor(private messagingService: MessagingService, private userService: UserService, private modalService: NgbModal, private router: Router) {
        this.encrypt = new JsEncryptModule.JSEncrypt();
        this.encrypt.setPrivateKey(environment.privateSSHRASKey);

        this.alls = this.userService.getAlls();
    }

    ngOnInit() {
        this.messagingService.getPermission();
        this.messagingService.receiveMessage();
        this.message = this.messagingService.currentMessage;
        if (this.alls) {
            this.alls.subscribe(users => {
                // console.log(users);
                this.users = users;
                this.users.forEach((item, index) => {
                    if (item.phone) {
                        item.phone = this.encrypt.decrypt(item.phone);
                    }
                });
            });
        }

    }

    deleteUser(id) {
        this.userService.deleteById(id);
    }

    open() {
        const modalRef = this.modalService.open(ConfirmComponent);
        console.log('AS');
        modalRef.componentInstance.question = 'World';
        modalRef.componentInstance.id = 1;

        modalRef.result.then((id) => {
            console.log(id);
            
        }, () => { })
        // this.modalService.open(content);
        // this.id_delete = id
    }

    geta(id){
        console.log(this.userService.getById(id));
    }

    // openDetail(id) {
    //     this.router.navigate(['/admin/users', id]);
    //     item : [
    //         {}
    //     ]
    //     this.userService.updateWithId(data, id);
    // }
}
