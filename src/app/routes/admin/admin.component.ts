import { Component, OnInit, Input } from '@angular/core';
import { MessagingService } from '@app/services/messaging.service';
import { UserService } from '@app/services/user.service';
import * as JsEncryptModule from 'jsencrypt';
import { environment } from '@env/environment';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.scss'],
    providers: [UserService]
})
export class AdminComponent implements OnInit {
    message;
    users = [];
    @Input() id_delete;
    encrypt;
    constructor(
            private messagingService: MessagingService,
            private userService: UserService,
            private modalService: NgbModal
        ) {
        this.encrypt = new JsEncryptModule.JSEncrypt();
        this.encrypt.setPrivateKey(environment.privateSSHRASKey);
    }

    ngOnInit() {
        this.messagingService.getPermission();
        this.messagingService.receiveMessage();
        this.message = this.messagingService.currentMessage;
        this.userService.getAlls().subscribe(users => {
            this.users = users;
            this.users.forEach((item, index) => {
                if (item.phone) {
                    item.phone = this.encrypt.decrypt(item.phone);
                    console.log(item);
                }
            });
            // console.log(users);
        });

    }

    deleteUser(id){
        this.userService.deleteById(id);
    }

    open(content, id) {
        this.modalService.open(content);
        this.id_delete = id
    }

}
